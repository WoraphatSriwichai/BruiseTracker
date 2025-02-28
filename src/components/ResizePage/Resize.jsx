import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Resize.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Resize = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [resizedImages, setResizedImages] = useState([]);
    const [dimensions, setDimensions] = useState({ width: '', height: '' });
    const [keepAspectRatio, setKeepAspectRatio] = useState(false);
    const [originalDimensions, setOriginalDimensions] = useState({ width: '', height: '' });
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('resize'); // Set default active button

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const navigate = useNavigate();
    const handleSignOut = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

    const handleNavigation = useCallback((path, buttonName) => {
        navigate(path);
        setActiveButton(buttonName);
    }, [navigate]);

    const handleAboutUs = useCallback(() => handleNavigation('/aboutusmain', 'aboutus'), [handleNavigation]);
    const handleContactUs = useCallback(() => handleNavigation('/contactusmain', 'contactus'), [handleNavigation]);
    const handleUserProfile = useCallback(() => handleNavigation('/profile', 'profile'), [handleNavigation]);
    const handleDashboard = useCallback(() => handleNavigation('/dashboard', 'home'), [handleNavigation]);
    const handleFeatureAnalysis = useCallback(() => handleNavigation('/analysis', 'analysis'), [handleNavigation]);
    const handleBruiseAreaCalculation = useCallback(() => handleNavigation('/bruise', 'bruise'), [handleNavigation]);
    const handleRemoveBackground = useCallback(() => handleNavigation('/removebackground', 'removebackground'), [handleNavigation]);
    const handlemainhomepage = useCallback(() => handleNavigation('/home', 'home'), [handleNavigation]);

    const handleCropImage = useCallback(() => {
        navigate('/crop');
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
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage} />
                </div>
                <div className="navbar-links">
                    <button className={`navbar-link ${activeButton === 'home' ? 'active' : ''}`} onClick={handleDashboard}>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </button>
                    <button className={`navbar-link ${activeButton === 'bruise' ? 'active' : ''}`} onClick={handleBruiseAreaCalculation}>
                        <FontAwesomeIcon icon={faCalculator} /> Bruised Area Calculation
                    </button>
                    <button className={`navbar-link ${activeButton === 'analysis' ? 'active' : ''}`} onClick={handleFeatureAnalysis}>
                        <FontAwesomeIcon icon={faChartBar} /> Feature Analysis
                    </button>
                    <button className={`navbar-link ${activeButton === 'resize' ? 'active' : ''}`}>
                        <FontAwesomeIcon icon={faExpand} /> Resize
                    </button>
                    <button className={`navbar-link ${activeButton === 'removebackground' ? 'active' : ''}`} onClick={handleRemoveBackground}>
                        <FontAwesomeIcon icon={faEraser} /> Remove Background
                    </button>
                    <button className={`navbar-link ${activeButton === 'aboutus' ? 'active' : ''}`} onClick={handleAboutUs}>
                        <FontAwesomeIcon icon={faInfoCircle} /> About Us
                    </button>
                    <button className={`navbar-link ${activeButton === 'contactus' ? 'active' : ''}`} onClick={handleContactUs}>
                        <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                    </button>
                </div>

                <div className="navbar-profile">
                    <img src={userProfileImg} alt="User Profile" className="user-profile" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={handleUserProfile}>View Profile</button>
                            <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    )}
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
                            const files = Array.from(e.dataTransfer.files);
                            handleFileChange({ target: { files } });
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
                        <label htmlFor="file-upload" className="browse-bruiseareacalculation-btn">
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
                    <button className="bt upload-bruiseareacalculation-bt" onClick={handleResizeImages}>
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
                        <button className="bt download-all-zip-bt" onClick={handleDownloadAllImages}>
                            Download All as ZIP
                        </button>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="footer-mainhomepage">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default Resize;