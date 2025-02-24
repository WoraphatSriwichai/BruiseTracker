from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
import cv2
import numpy as np
from sklearn.cluster import KMeans
import io
from PIL import Image

app = Flask(__name__)
CORS(app)

# Function to remove background using K-Means
def remove_background(image):
    height, width, _ = image.shape

    # Reshape the image to a 2D array of pixels
    pixels = image.reshape(-1, 3)

    # Apply K-means clustering
    kmeans = KMeans(n_clusters=2, random_state=42)
    kmeans.fit(pixels)

    # Get cluster labels and centroids
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_

    # Determine which cluster is the background based on brightness (assumes lighter background)
    background_label = np.argmax(np.mean(centroids, axis=1))  # The brighter cluster is background

    # Create a mask for the foreground
    mask = (labels != background_label).astype(np.uint8)
    mask = mask.reshape(height, width)

    # Refine the mask (optional: morphological operations)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)

    # Remove the background
    foreground = cv2.bitwise_and(image, image, mask=mask)

    # Convert to transparent by adding an alpha channel
    result = cv2.cvtColor(foreground, cv2.COLOR_RGB2RGBA)
    result[:, :, 3] = mask * 255

    return result

@app.route('/remove_background', methods=['POST'])
def remove_background_route():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    file = request.files['image']
    image = Image.open(file.stream)
    image_rgb = np.array(image.convert('RGB'))
    result = remove_background(image_rgb)
    result_image = Image.fromarray(result)
    img_io = io.BytesIO()
    result_image.save(img_io, 'PNG')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4000)