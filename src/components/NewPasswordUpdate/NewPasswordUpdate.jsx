import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewPasswordUpdate.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import checkImg from '../../assets/check.png'; // Import the check.png image
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const PasswordUpdatePage = () => {
    const navigate = useNavigate();

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
            
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

    const handleAboutUs = useCallback(() => navigate('/aboutusmain'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactusmain'), [navigate]);
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
            <footer className="footer-mainhomepage">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default PasswordUpdatePage;