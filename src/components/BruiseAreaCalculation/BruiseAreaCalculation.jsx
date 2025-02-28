import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BruiseAreaCalculation.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const BruiseAreaCalculation = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleNavigation = (path) => {
        navigate(path);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

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

    const handleUpload = useCallback(() => {
        const fileData = selectedFiles.map((file, index) => ({
            id: index + 1,
            photoName: file.name,
            date: new Date().toLocaleString(),
            area: "---",
            percentage: "---",
            src: URL.createObjectURL(file)
        }));
        
        localStorage.setItem('uploadedFiles', JSON.stringify(fileData));

        const operationHistory = JSON.parse(localStorage.getItem('operationHistory')) || [];
        operationHistory.push({
            type: 'Bruised Area Calculation',
            date: new Date().toLocaleString()
        });
        localStorage.setItem('operationHistory', JSON.stringify(operationHistory));

        navigate('/showarea/accuracy');
    }, [selectedFiles, navigate]);

    return (
        <div className="bruiseareacalculation-page">
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={() => handleNavigation('/home')} />
                </div>
                <div className="navbar-links">
                    <button className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('/dashboard')}> <FontAwesomeIcon icon={faHome} />  Home</button>
                    <button className={`navbar-link ${location.pathname === '/bruise' ? 'active' : ''}`}> <FontAwesomeIcon icon={faCalculator} /> Bruised Area Calculation</button>
                    <button className={`navbar-link ${location.pathname === '/analysis' ? 'active' : ''}`} onClick={() => handleNavigation('/analysis')}> <FontAwesomeIcon icon={faChartBar} /> Feature Analysis</button>
                    <button className={`navbar-link ${location.pathname === '/resize' ? 'active' : ''}`} onClick={() => handleNavigation('/resize')}> <FontAwesomeIcon icon={faExpand} /> Resize</button>
                    <button className={`navbar-link ${location.pathname === '/removebackground' ? 'active' : ''}`} onClick={() => handleNavigation('/removebackground')}> <FontAwesomeIcon icon={faEraser} /> Remove Background</button>
                    <button className={`navbar-link ${location.pathname === '/aboutusmain' ? 'active' : ''}`} onClick={() => handleNavigation('/aboutusmain')}> <FontAwesomeIcon icon={faInfoCircle} /> About Us</button>
                    <button className={`navbar-link ${location.pathname === '/contactusmain' ? 'active' : ''}`} onClick={() => handleNavigation('/contactusmain')}> <FontAwesomeIcon icon={faEnvelope} /> Contact Us</button>
                </div>
                
                <div className="navbar-profile" onClick={toggleProfileDropdown}>
                    <img src={userProfileImg} alt="User Profile" className="user-profile" />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={() => handleNavigation('/profile')}>View Profile</button>
                            <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    )}
                </div>
            </nav>

            <div className="bruiseareacalculation-content">
                <h1 className="bruiseareacalculation-title">Bruise Area Calculation</h1>
                <p className="bruise-description">
                    The Bruise area calculation will show the total area of mango and the total bruise area of mango.
                </p>
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
                        <label htmlFor="file-upload" className="browse-bruiseareacalculation-btn">
                            Browse 📁
                        </label>
                        <p>🚨Only .jpg .jpeg .png files are allowed</p>
                    </div>

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
                    <button className="bt backto-bt" onClick={() => handleNavigation('/dashboard')}>
                        Back
                    </button>
                    <button className="bt upload-bruiseareacalculation-bt" onClick={handleUpload}>
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

export default BruiseAreaCalculation;