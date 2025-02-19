import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureAnalysis.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

const FeatureAnalysis = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();
    
    const handleAboutUs = useCallback(() => navigate('/aboutus'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactus'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);
    const handleFeatureAnalysisResults = useCallback(() => {
        const fileData = selectedFiles.map((file, index) => ({
            id: index + 1,
            name: file.name,
            size: file.size,
            date: new Date().toLocaleString(),
            src: URL.createObjectURL(file)
        }));
        localStorage.setItem('uploadedFiles', JSON.stringify(fileData));

        // Update operation history
        const operationHistory = JSON.parse(localStorage.getItem('operationHistory')) || [];
        operationHistory.push({
            type: 'Feature Analysis',
            date: new Date().toLocaleString()
        });
        localStorage.setItem('operationHistory', JSON.stringify(operationHistory));

        navigate('/analysis/result');
    }, [selectedFiles, navigate]);

    const handleFileChange = useCallback((event) => {
        const files = Array.from(event.target.files);
        const validFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file.name));

        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only .jpg, .jpeg, and .png files are allowed.');
        }
    }, []);

    const handleDragOver = useCallback((event) => {
        event.preventDefault();
        setDragActive(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setDragActive(false);
    }, []);

    const handleDrop = useCallback((event) => {
        event.preventDefault();
        setDragActive(false);
        const files = Array.from(event.dataTransfer.files);
        const validFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file.name));
        
        if (validFiles.length > 0) {
            setSelectedFiles(prevFiles => [...prevFiles, ...validFiles]);
        } else {
            alert('Only .jpg, .jpeg, and .png files are allowed.');
        }
    }, []);

    const handleFileDelete = useCallback((index) => {
        setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    }, []);

    return (
        <div className="bruise-page">

            {/* Navbar */}
            <nav className="FeatureAnalysis-navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage}/>
                </div>
                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}>Dashboard</button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}>Bruised Area Calculation</button>
                    <button className="navbar-link">Feature Analysis</button>
                    <button className="navbar-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link" onClick={handleRemoveBackground}>Remove Background</button>
                    <button className="navbar-link" onClick={handleAboutUs}>About Us</button>
                    <button className="navbar-link" onClick={handleContactUs}>Contact Us</button>
                </div>
                <div className="navbar-profile" onClick={handleUserProfile}>
                    <img src={userProfileImg} alt="User Profile" className="user-profile" />
                </div>
            </nav>

            {/* Content */}
            <div className="bruise-content">
                <h1 className="bruise-title">Feature Analysis</h1>

                <div className="feature-selection-container">
                    <h2 className="feature-selection-title">Feature Selection</h2>
                    <p className="feature-selection-description">
                        Select the features to analyze and enhance your mango bruise detection process.
                    </p>
                    <div className="feature-selection-grid">
                        <div className="feature-category">
                            <h3>Color Features</h3>
                            <div className="feature-option">
                                <input type="checkbox" id="rgb" name="rgb" />
                                <label htmlFor="rgb">RGB</label>
                                <span className="tooltip" data-tooltip="RGB represents the red, green, and blue color channels.">?</span>
                            </div>
                            <div className="feature-option">
                                <input type="checkbox" id="hsv" name="hsv" />
                                <label htmlFor="hsv">HSV</label>
                                <span className="tooltip" data-tooltip="HSV stands for hue, saturation, and value.">?</span>
                            </div>
                        </div>

                        <div className="feature-category">
                            <h3>Texture Features</h3>
                            <div className="feature-option">
                                <input type="checkbox" id="glcm" name="glcm" />
                                <label htmlFor="glcm">GLCM</label>
                                <span className="tooltip" data-tooltip="Gray-Level Co-occurrence Matrix for texture analysis.">?</span>
                            </div>
                            <div className="feature-option">
                                <input type="checkbox" id="lbp" name="lbp" />
                                <label htmlFor="lbp">LBP</label>
                                <span className="tooltip" data-tooltip="Local Binary Patterns for texture recognition.">?</span>
                            </div>
                            <div className="feature-option">
                                <input type="checkbox" id="gabor" name="gabor" />
                                <label htmlFor="gabor">Gabor Filter</label>
                                <span className="tooltip" data-tooltip="Used for edge detection and texture analysis.">?</span>
                            </div>
                        </div>

                        <div className="feature-category">
                            <h3>Shape Features</h3>
                            <div className="feature-option">
                                <input type="checkbox" id="eccentricity" name="eccentricity" />
                                <label htmlFor="eccentricity">Eccentricity</label>
                                <span className="tooltip" data-tooltip="Measures how circular the shape is.">?</span>
                            </div>
                            <div className="feature-option">
                                <input type="checkbox" id="area" name="area" />
                                <label htmlFor="area">Area</label>
                                <span className="tooltip" data-tooltip="Calculates the total area of the mango.">?</span>
                            </div>
                            <div className="feature-option">
                                <input type="checkbox" id="perimeter" name="perimeter" />
                                <label htmlFor="perimeter">Perimeter</label>
                                <span className="tooltip" data-tooltip="Measures the boundary length of the shape.">?</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="file-upload-container">
                    <div
                        className={`file-dropzone ${dragActive ? 'drag-active' : ''}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
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
                        <label htmlFor="file-upload" className="browse-btn">
                            Browse 📁
                        </label>
                        <p>🚨Only .jpg .jpeg .png files are allowed</p>
                    </div>

                    {/* Show the selected files box */}
                    <div className="selected-files-box">
                        <h3>Selected Files:</h3>
                        <ul>
                            {selectedFiles.map((file, index) => (
                                <li key={index} className="file-item">
                                    {file.name} ({(file.size / 1024).toFixed(2)} KB)
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleFileDelete(index)}
                                    >
                                        ❌
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="action-buttons">
                    <button className="bt backkk-bt" onClick={handleDashboard}>
                        Back
                    </button>
                    <button className="bt upload-bt" onClick={handleFeatureAnalysisResults}>
                        Upload
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-featureanalysis">
                <div className="footer-address-featureanalysis">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default FeatureAnalysis;