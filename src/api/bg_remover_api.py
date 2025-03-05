import os

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from sklearn.cluster import MiniBatchKMeans
import io
from PIL import Image
import logging
from concurrent.futures import ThreadPoolExecutor

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set environment variable to optimize MiniBatchKMeans
os.environ['OMP_NUM_THREADS'] = '6'

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Function to remove background using MiniBatchKMeans
def remove_background(image):
    # Downscale the image for faster processing
    scale_factor = 0.5
    small_image = cv2.resize(image, (0, 0), fx=scale_factor, fy=scale_factor, interpolation=cv2.INTER_AREA)
    height, width, _ = small_image.shape

    # Reshape the image to a 2D array of pixels
    pixels = small_image.reshape(-1, 3)

    # Apply MiniBatchKMeans clustering
    kmeans = MiniBatchKMeans(n_clusters=2, random_state=42, batch_size=3072)
    kmeans.fit(pixels)

    # Get cluster labels and centroids
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_

    # Determine which cluster is the background based on brightness (assumes lighter background)
    background_label = np.argmax(np.mean(centroids, axis=1))  # The brighter cluster is background

    # Create a mask for the foreground
    mask = (labels != background_label).astype(np.uint8)
    mask = mask.reshape(height, width)

    # Upscale the mask to the original image size
    mask = cv2.resize(mask, (image.shape[1], image.shape[0]), interpolation=cv2.INTER_LINEAR)

    # Refine the mask (optional: morphological operations)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    # Remove the background
    foreground = cv2.bitwise_and(image, image, mask=mask)

    # Convert to transparent by adding an alpha channel
    result = cv2.cvtColor(foreground, cv2.COLOR_RGB2RGBA)
    result[:, :, 3] = mask * 255

    return result

@app.post("/remove_background")
async def remove_background_route(file: UploadFile = File(...)):
    try:
        logger.info(f"Received file: {file.filename}")
        image = Image.open(file.file)
        image_rgb = np.array(image.convert('RGB'))
        
        # Use ThreadPoolExecutor for parallel processing
        with ThreadPoolExecutor() as executor:
            future = executor.submit(remove_background, image_rgb)
            result = future.result()
        
        result_image = Image.fromarray(result)
        img_io = io.BytesIO()
        result_image.save(img_io, 'PNG')
        img_io.seek(0)
        return StreamingResponse(img_io, media_type="image/png")
    except Exception as e:
        logger.error(f"Error processing file: {e}")
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=4000)