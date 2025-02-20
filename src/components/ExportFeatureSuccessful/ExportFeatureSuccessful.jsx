import React, { useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './ExportFeatureSuccessful.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import checkImg from '../../assets/check.png'; // Import the check.png image

const ExportFeatureSuccessful = () => {
    const navigate = useNavigate();

    const handleAboutUs = useCallback(() => { navigate('/aboutus'); }, [navigate]);
    const handleContactUs = useCallback(() => { navigate('/contactus'); }, [navigate]);
    const handleDashboard = useCallback(() => { navigate('/dashboard'); }, [navigate]);
    const handleUserProfile = useCallback(() => { navigate('/profile'); }, [navigate]);
    const handleFeatureAnalysisResults = useCallback(() => { navigate('/analysis/result'); }, [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => { navigate('/bruise'); }, [navigate]);
    const handleFeatureAnalysis = useCallback(() => { navigate('/analysis'); }, [navigate]);
    const handleResize = useCallback(() => { navigate('/resize'); }, [navigate]);
    const handleRemoveBackground = useCallback(() => { navigate('/removebackground'); }, [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);
    
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

    return (
        <div className="export-feature-page">

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

            {/* Password Update Content */}
            <div className="export-feature-content">
                <div className="export-feature-container">
                    <div className="export-feature-form">

                        {/* Center the check image and text */}
                        <div className="check-container">
                            <img src={checkImg} alt="Check" className="check-img" />
                            <p>Your CSV has been exported successfully</p>
                        </div>
                        <button className="export-password-button" onClick={handleFeatureAnalysisResults}>Done</button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-exportfeature">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default ExportFeatureSuccessful;
