import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHomePage.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/mango_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function MainHomePage() {
    const navigate = useNavigate();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleAboutUs = useCallback(() => navigate('/aboutusmain'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactusmain'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/analysis'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);
    
    const handleSignOut = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    return (
        <div className="main-homepage">
            
            {/* Navbar */}
            <nav className="navbar-mainhomepage">
                <div className="navbar-brand">
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
                        <FontAwesomeIcon icon={faCalculator} /> Bruise Area Calculation
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
                    <img src={userProfileImg} alt="User Profile" className="user-profile-mainhomepage" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={handleUserProfile}>View Profile</button>
                            <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    )}
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