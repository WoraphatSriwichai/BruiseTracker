import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Resize.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import JSZip from "jszip";
import { saveAs } from "file-saver";

const Resize = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [resizedImages, setResizedImages] = useState([]);
    const [dimensions, setDimensions] = useState({ width: '', height: '' });
    const [keepAspectRatio, setKeepAspectRatio] = useState(false);
    const [originalDimensions, setOriginalDimensions] = useState({ width: '', height: '' });

    const navigate = useNavigate();
    const handleAboutUs = useCallback(() => navigate('/aboutuspage'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactuspage'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/userprofilepage'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboardpage'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/featureanalysis'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruiseareacalculation'), [navigate]);
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/mainhomepage'), [navigate]);

    // Navigation handlers
    const handleCropImage = useCallback(() => {
        navigate('/cropimage'); // Navigate to the CropImage page
    }, [navigate]);

    const handleDownloadAllImages = useCallback(async () => {
        const zip = new JSZip();
        const imagePromises = resizedImages.map(async (image) => {
            const imgBlob = await new Promise((resolve) => {
                const canvas = new OffscreenCanvas(image.width, image.height);
                const ctx = canvas.getContext('2d');
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, image.width, image.height);
                    canvas.convertToBlob({ type: 'image/jpeg' }).then(resolve);
                };
                img.src = URL.createObjectURL(
                    selectedFiles.find((file) => file.name === image.name)
                );
            });
            zip.file(image.name, imgBlob);
        });

        await Promise.all(imagePromises);
        const content = await zip.generateAsync({ type: 'blob' });
        saveAs(content, 'resized-images.zip');
    }, [resizedImages, selectedFiles]);

    const handleFileChange = useCallback((event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file.name));

        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only .jpg, .jpeg, and .png files are allowed.');
        }
    }, []);

    const handleResizeImages = useCallback(() => {
        if (!dimensions.width || !dimensions.height) {
            alert('Please enter both width and height!');
            return;
        }

        const resized = selectedFiles.map(file => ({
            name: file.name,
            width: dimensions.width,
            height: dimensions.height,
        }));

        setResizedImages(resized);
    }, [dimensions, selectedFiles]);

    const handleDownloadImage = useCallback((image) => {
        const canvas = new OffscreenCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            ctx.drawImage(img, 0, 0, image.width, image.height);
            canvas.convertToBlob({ type: 'image/jpeg' }).then((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = image.name;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            });
        };

        img.src = URL.createObjectURL(selectedFiles.find(file => file.name === image.name));
    }, [selectedFiles]);

    const handleReset = useCallback(() => {
        setSelectedFiles([]);
        setResizedImages([]);
        setDimensions({ width: '', height: '' });
        setOriginalDimensions({ width: '', height: '' });
    }, []);

    const handleRemoveFile = useCallback((index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
        setResizedImages(prevImages => prevImages.filter((_, i) => i !== index));
    }, []);

    useEffect(() => {
        if (keepAspectRatio && originalDimensions.width && originalDimensions.height) {
            const aspectRatio = originalDimensions.width / originalDimensions.height;
            if (dimensions.width) {
                setDimensions(prev => ({
                    ...prev,
                    height: Math.round(dimensions.width / aspectRatio)
                }));
            } else if (dimensions.height) {
                setDimensions(prev => ({
                    ...prev,
                    width: Math.round(dimensions.height * aspectRatio)
                }));
            }
        }
    }, [keepAspectRatio, dimensions.width, dimensions.height, originalDimensions]);

    useEffect(() => {
        return () => {
            selectedFiles.forEach(file => URL.revokeObjectURL(file.preview));
        };
    }, [selectedFiles]);

    return (
      <div className="bruiseareacalculation-page">
        <nav className="navbar">
          <div className="navbar-brand">
            <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage}/>
          </div>
          <div className="navbar-links">
            <button className="navbar-link" onClick={handleDashboard}>
              Dashboard
            </button>
            <button
              className="navbar-link"
              onClick={handleBruiseAreaCalculation}
            >
              Bruised Area Calculation
            </button>
            <button className="navbar-link" onClick={handleFeatureAnalysis}>
              Feature Analysis
            </button>
            <button className="navbar-link">Resize</button>
            <button className="navbar-link" onClick={handleRemoveBackground}>
              Remove Background
            </button>
            <button className="navbar-link" onClick={handleAboutUs}>
              About Us
            </button>
            <button className="navbar-link" onClick={handleContactUs}>
              Contact Us
            </button>
          </div>
          <div className="navbar-profile" onClick={handleUserProfile}>
            <img
              src={userProfileImg}
              alt="User Profile"
              className="user-profile"
            />
          </div>
        </nav>

        <div className="bruiseareacalculation-content">
          <h1 className="bruiseareacalculation-title">Resize Image</h1>
          <p className="bruise-description">
            Resize JPG, PNG, SVG or GIF by defining new height and width pixels.
            Change image dimensions in bulk.
          </p>
          <div className="file-upload-container">
            <div
              className={`file-dropzone ${dragActive ? "drag-active" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const files = Array.from(e.dataTransfer.files); // Handle dropped files
                handleFileChange({ target: { files } }); // Call handleFileChange
              }}
            >
              <p>Drag & Drop your images here or</p>
              <input
                type="file"
                className="file-input"
                id="file-upload"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                multiple
              />
              <label
                htmlFor="file-upload"
                className="browse-bruiseareacalculation-btn"
              >
                Browse 📁
              </label>
              <p>🚨 Only .jpg .jpeg .png files are allowed</p>
            </div>
            <div className="resize-settings-bruiseareacalculation">
              <h3>Resize Settings:</h3>
              <div className="input-group">
                <input
                  type="number"
                  className="resize-number-input"
                  placeholder="Width (px)"
                  value={dimensions.width}
                  onChange={(e) => {
                    const newWidth = e.target.value;
                    setDimensions((prev) => ({ ...prev, width: newWidth }));
                    if (!originalDimensions.width) {
                      setOriginalDimensions((prev) => ({
                        ...prev,
                        width: newWidth,
                      }));
                    }
                  }}
                />
                <input
                  type="number"
                  className="resize-number-input"
                  placeholder="Height (px)"
                  value={dimensions.height}
                  onChange={(e) => {
                    const newHeight = e.target.value;
                    setDimensions((prev) => ({ ...prev, height: newHeight }));
                    if (!originalDimensions.height) {
                      setOriginalDimensions((prev) => ({
                        ...prev,
                        height: newHeight,
                      }));
                    }
                  }}
                />
              </div>
              <label className="aspect-ratio-label">
                <input
                  type="checkbox"
                  checked={keepAspectRatio}
                  onChange={() => setKeepAspectRatio(!keepAspectRatio)}
                />
                Keep Aspect Ratio
              </label>
            </div>

            <div className="selected-files-box">
              <h3>Selected Files:</h3>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index} className="file-item">
                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                    <button
                      className="delete-btn"
                      onClick={() => handleRemoveFile(index)}
                    >
                      ❌
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="action-buttons">
            <button className="bt backto-bt" onClick={handleReset}>
              Reset
            </button>
            <button
              className="bt upload-bruiseareacalculation-bt"
              onClick={handleResizeImages}
            >
              Resize
            </button>
            <button className="bt crop-image-bt" onClick={handleCropImage}>
              Crop Image
            </button>
          </div>

          {resizedImages.length > 0 && (
            <div className="resized-images">
              <h3>Resized Images:</h3>
              <div className="resized-images-grid">
                {resizedImages.map((image, index) => (
                  <div key={index} className="resized-image-card">
                    <img
                      src={URL.createObjectURL(
                        selectedFiles.find((file) => file.name === image.name)
                      )}
                      alt={image.name}
                      className="resized-image-preview"
                    />
                    <p className="resized-image-details">
                      {image.name} - {image.width}px x {image.height}px
                    </p>
                    <button
                      className="download-btn"
                      onClick={() => handleDownloadImage(image)}
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
              <button
                className="bt download-all-zip-bt"
                onClick={handleDownloadAllImages}
              >
                Download All as ZIP
              </button>
            </div>
          )}
        </div>

        <footer className="footer-resize">
          <div className="footer-address-resize">
              <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
          </div>
        </footer>
      </div>
    );
};

export default Resize;