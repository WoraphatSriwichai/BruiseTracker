import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './RemoveBackground.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

const RemoveBackground = () => {
    const navigate = useNavigate();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [processedImages, setProcessedImages] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [dragActive, setDragActive] = useState(false);

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
            
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {
        // Clear authentication tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Navigate to sign-in page
        navigate('/signin');
    }, [navigate]);

    const handleAboutUs = useCallback(() => navigate('/aboutusmain'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactusmain'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/analysis'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file.name));

        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only .jpg, .jpeg, and .png files are allowed.');
        }
    };

    const handleRemoveBackground = async () => {
        if (selectedFiles.length === 0) {
            alert('Please upload images first!');
            return;
        }

        setErrorMessage(''); // Clear any previous error messages

        try {
            const processed = await Promise.all(selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post('http://localhost:4000/remove_background', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    responseType: 'blob',
                });

                const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
                return { name: file.name, url: imageUrl };
            }));

            setProcessedImages(processed);
        } catch (error) {
            console.error('Error removing background:', error);
            setErrorMessage('Failed to remove background. Please try again.');
        }
    };

    const handleDownloadImage = (image) => {
        const a = document.createElement('a');
        a.href = image.url;
        a.download = `processed-${image.name}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleDownloadAllAsZip = async () => {
        const zip = new JSZip();
        const folder = zip.folder("processed_images");

        await Promise.all(processedImages.map(async (image) => {
            const response = await fetch(image.url);
            const blob = await response.blob();
            folder.file(`processed-${image.name}`, blob);
        }));

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "processed_images.zip");
    };

    const handleReset = () => {
        setSelectedFiles([]);
        setProcessedImages([]);
        setErrorMessage('');
    };

    return (
        <div className="remove-background-page">
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage}/>
                </div>
                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}>Dashboard</button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}>Bruised Area Calculation</button>
                    <button className="navbar-link" onClick={handleFeatureAnalysis}>Feature Analysis</button>
                    <button className="navbar-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link">Remove Background</button>
                    <button className="navbar-link" onClick={handleAboutUs}>About Us</button>
                    <button className="navbar-link" onClick={handleContactUs}>Contact Us</button>
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

            <div className="remove-background-content">
                <h1 className="remove-background-title">Remove Background</h1>
                <p className="remove-background-description">
                    Remove your background in just 5 seconds by simply uploading your images!
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
                            className="browse-btn"
                        >
                            Browse 📁
                        </label>
                        <p>🚨 Only .jpg .jpeg .png files are allowed</p>
                    </div>

                    <div className="selected-files-box">
                        <h3>Selected Files:</h3>
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li key={index} className="file-item">
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="btn reset-btn" onClick={handleReset}>
                        Reset
                    </button>
                    <button className="btn remove-btn" onClick={handleRemoveBackground}>
                        Remove
                    </button>
                </div>

                {processedImages.length > 0 && (
                    <div className="processed-images">
                        <h3>Processed Images:</h3>
                        <div className="processed-images-grid">
                            {processedImages.map((image, index) => (
                                <div key={index} className="processed-image-card">
                                    <img src={image.url} alt={image.name} className="processed-image-preview" />
                                    <p className="processed-image-details">{image.name}</p>
                                    <button className="download-btn" onClick={() => handleDownloadImage(image)}>
                                        Download
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button className="btn download-all-btn" onClick={handleDownloadAllAsZip}>
                            Download All as ZIP
                        </button>
                    </div>
                )}

                {errorMessage && (
                    <div className="error-message">
                        <p>{errorMessage}</p>
                    </div>
                )}
            </div>

            <footer className="footer">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default RemoveBackground;