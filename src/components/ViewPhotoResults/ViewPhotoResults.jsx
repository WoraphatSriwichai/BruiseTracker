import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewPhotoResults.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ViewPhotoResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { index } = location.state || { index: 0 };

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
            
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(index);

    useEffect(() => {
        const storedFiles = localStorage.getItem('uploadedFiles');
        if (storedFiles) {
            setImages(JSON.parse(storedFiles));
        }
    }, []);

    // Navigation functions for pictures
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    // Navigation handlers
    const handleAboutUs = () => navigate('/aboutusmain');
    const handleContactUs = () => navigate('/contactusmain');
    const handleUserProfile = () => navigate('/profile');
    const handleBack = () => navigate("/showarea/accuracy");
    const handleDashboard = () => navigate('/dashboard');
    const handleBruiseAreaCalculation = () => navigate('/bruise');
    const handleFeatureAnalysis = () => navigate('/analysis');
    const handleResize = () => navigate('/resize');
    const handleRemoveBackground = () => navigate('/removebackground');
    const handlemainhomepage = () => navigate('/home');

    return (
        <div className="view-photo-result-page">

            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage}/>
                </div>

                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </button>
                    <button className="navbar-link" onClick={handleResize}>
                        <FontAwesomeIcon icon={faExpand} /> Resize
                    </button>
                    <button className="navbar-link" onClick={handleRemoveBackground}>
                        <FontAwesomeIcon icon={faEraser} /> Remove Background
                    </button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}>
                        <FontAwesomeIcon icon={faCalculator} /> Bruised Area Calculation
                    </button>
                    <button className="navbar-link" onClick={handleFeatureAnalysis}>
                        <FontAwesomeIcon icon={faChartBar} /> Feature Analysis
                    </button>
                    <button className="navbar-link" onClick={handleAboutUs}>
                        <FontAwesomeIcon icon={faInfoCircle} /> About Us
                    </button>
                    <button className="navbar-link" onClick={handleContactUs}>
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

            {/* View Photo Content */}
            <div className="show-area-calculation-content">
                <h2 className="show-area-calculation-title">View Photo</h2>

                {/* Main Content */}
                <main className="main-content">
                    <div className="photo-container">
                        <button className="nav-button prev-button" onClick={handlePrevious}>◀</button>
                        {images.length > 0 && (
                            <img src={images[currentIndex].src} alt={images[currentIndex].photoName} className="photo" />
                        )}
                        <button className="nav-button next-button" onClick={handleNext}>▶</button>
                        {images.length > 0 && (
                            <div className="photo-info">
                                <p>{images[currentIndex].info}</p>
                            </div>
                        )}
                    </div>
                </main>

                {/* Action Buttons */}
                <div className="area-action-buttons">
                    <button className="btn back-to-btn" onClick={handleBack}>Back</button>
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

export default ViewPhotoResults;