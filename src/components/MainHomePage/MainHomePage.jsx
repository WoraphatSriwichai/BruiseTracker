import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHomePage.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

function MainHomePage() {
    const navigate = useNavigate();

    const handleAboutUs = useCallback(() => navigate('/aboutuspage'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactuspage'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboardpage'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/userprofilepage'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruiseareacalculation'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/featureanalysis'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/mainhomepage'), [navigate]);

    return (
        <div className="main-homepage">
            
            {/* Navbar */}
            <nav className="navbar-mainhomepage">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="manger-logo" onClick={handlemainhomepage}/>
                </div>

                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}>Dashboard</button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}>Bruise Area Calculation</button>
                    <button className="navbar-link" onClick={handleFeatureAnalysis}>Feature Analysis</button>
                    <button className="navbar-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link" onClick={handleRemoveBackground}>Remove Background</button>
                    <button className="navbar-link" onClick={handleAboutUs}>About Us</button>
                    <button className="navbar-link" onClick={handleContactUs}>Contact Us</button>
                </div>

                <div className="navbar-profile">
                    <img src={userProfileImg} alt="User Profile" className="user-profile" onClick={handleUserProfile} />
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section" style={{ backgroundImage: `url(${mangoBackground})` }}>
                <div className="hero-content">
                    <h1>Welcome to Mangoers Bruise Tracker!</h1>
                    <p>In the agricultural industry, finding bruised areas on mangoes with just the naked eye can be challenging, as many bruises are not easily visible. These hidden bruises can reduce the quality and market value of the fruit. The project Bruise Tracker aims to solve this problem by using computer vision technology to accurately detect and measure bruised areas that are hard to see. By providing precise calculations of the bruise-to-fruit ratio, bruise tracker offers important benefits for quality control and marketability. This technology automates the bruise detection process, making it more efficient, accurate, and reliable, and has the potential to improve fruit selection and reduce waste in the agricultural sector.</p>
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
}

export default MainHomePage;