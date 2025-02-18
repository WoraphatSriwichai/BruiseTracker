import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ViewPhotoResults.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

const ViewPhotoResults = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { index } = location.state || { index: 0 };

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
    const handleAboutUs = () => navigate('/aboutuspage');
    const handleContactUs = () => navigate('/contactuspage');
    const handleUserProfile = () => navigate('/userprofilepage');
    const handleBack = () => navigate("/showareacalculation");
    const handleDashboard = () => navigate('/dashboardpage');
    const handleBruiseAreaCalculation = () => navigate('/bruiseareacalculation');
    const handleFeatureAnalysis = () => navigate('/featureanalysis');
    const handleResize = () => navigate('/resize');
    const handleRemoveBackground = () => navigate('/removebackground');
    const handlemainhomepage = () => navigate('/mainhomepage')

    return (
        <div className="view-photo-result-page">

            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage}/>
                </div>

                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}>Dashboard</button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}>Bruised Area Calculation</button>
                    <button className="navbar-link" onClick={handleFeatureAnalysis}>Feature Analysis</button>
                    <button className="profile-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link" onClick={handleRemoveBackground}>Remove Background</button>
                    <button className="edit-link" onClick={handleAboutUs}>About Us</button>
                    <button className="edit-link" onClick={handleContactUs}>Contact Us</button>
                </div>

                <div className="navbar-profile" onClick={handleUserProfile}>
                    <img src={userProfileImg} alt="User Profile" className="user-profile" />
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
            <footer className="footer-viewphotoresutls">
                <div className="footer-address-viewphotoresults">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default ViewPhotoResults;