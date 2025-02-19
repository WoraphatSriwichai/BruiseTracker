import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPasswordUpdate.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import checkImg from '../../assets/check.png'; // Import the check.png image

const PasswordUpdatePage = () => {
    const navigate = useNavigate();

    const handleAboutUs = useCallback(() => navigate('/aboutus'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactus'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
    const handleSignIn = useCallback(() => navigate('/signin'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/analysis'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

    return (
        <div className="password-update-page">

            {/* Navbar */}
            <nav className="profile">
                <div className="profile-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="manger-logo" onClick={handlemainhomepage}/>
                </div>

                <div className="navbar-links">
                    <button className="profile-link" onClick={handleDashboard}>Dashboard</button>
                    <button className="profile-link" onClick={handleBruiseAreaCalculation}>Bruised Area Calculation</button>
                    <button className="profile-link" onClick={handleFeatureAnalysis}>Feature Analysis</button>
                    <button className="profile-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link" onClick={handleRemoveBackground}>Remove Background</button>
                    <button className="edit-link" onClick={handleAboutUs}>About Us</button>
                    <button className="edit-link" onClick={handleContactUs}>Contact Us</button>
                </div>

                <div className="navbar-profile">
                    <img src={userProfileImg} alt="User Profile" className="user-profile" onClick={handleUserProfile} />
                </div>
            </nav>

            {/* Password Update Content */}
            <div className="password-update-content">
                <div className="password-update-container">
                    <div className="password-update-form">
                        {/* Center the check image and text */}
                        <div className="check-container">
                            <img src={checkImg} alt="Check" className="check-img" />
                            <p>Your password has been updated</p>
                        </div>
                        <button className="save-password-button" onClick={handleSignIn}>Sign-in</button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-newpasswordupdate">
                <div className="footer-address-newpasswordupdate">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default PasswordUpdatePage;
