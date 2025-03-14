import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureAnalysis.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/mango_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FeatureAnalysis = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('featureAnalysis'); // Set default active button
    const [inputValue, setInputValue] = useState("");

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

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
    const handleBruiseAreaCalculation = useCallback(() => handleNavigation('/bruise', 'bruise'), [handleNavigation]);
    const handleResize = useCallback(() => handleNavigation('/resize', 'resize'), [handleNavigation]);
    const handleRemoveBackground = useCallback(() => handleNavigation('/removebackground', 'removebackground'), [handleNavigation]);
    const handlemainhomepage = useCallback(() => handleNavigation('/home', 'home'), [handleNavigation]);

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
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage} />
                </div>
                <div className="navbar-links">
                    <button className={`navbar-link ${activeButton === 'home' ? 'active' : ''}`} onClick={handleDashboard}> <FontAwesomeIcon icon={faHome} />Home</button>
                    <button className={`navbar-link ${activeButton === 'resize' ? 'active' : ''}`} onClick={handleResize}><FontAwesomeIcon icon={faExpand} />Resize</button>
                    <button className={`navbar-link ${activeButton === 'removebackground' ? 'active' : ''}`} onClick={handleRemoveBackground}><FontAwesomeIcon icon={faEraser} />Remove Background</button>
                    <button className={`navbar-link ${activeButton === 'bruise' ? 'active' : ''}`} onClick={handleBruiseAreaCalculation}><FontAwesomeIcon icon={faCalculator} />Bruised Area Calculation</button>
                    <button className={`navbar-link ${activeButton === 'featureAnalysis' ? 'active' : ''}`}><FontAwesomeIcon icon={faChartBar} />Feature Analysis</button>
                    <button className={`navbar-link ${activeButton === 'aboutus' ? 'active' : ''}`} onClick={handleAboutUs}><FontAwesomeIcon icon={faInfoCircle} />About Us</button>
                    <button className={`navbar-link ${activeButton === 'contactus' ? 'active' : ''}`} onClick={handleContactUs}><FontAwesomeIcon icon={faEnvelope} />Contact Us</button>
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

            {/* Content */}
            <div className="bruise-content">
                <h1 className="bruise-title">Feature Analysis</h1>

                <div className="feature-selection-container">
                    <h2 className="feature-selection-title">Feature Selection</h2>
                    <p className="feature-selection-description">
                        Select the features to analyze and enhance your mango bruise detection process.
                    </p>

                    {/* Typing Box */}
                    <div className="typing-box">
                        <label htmlFor="customFeature">Enter a custom feature:</label>
                        <input 
                            type="text" 
                            id="customFeature" 
                            name="customFeature" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)} 
                            placeholder="Type your feature here..." 
                        />
                    </div>

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
            <footer className="footer-mainhomepage">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default FeatureAnalysis;