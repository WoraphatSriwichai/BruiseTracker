import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FirstHomePage.css';
import mangoBackground from '../../assets/differentmango.jpg';
import logoWhite from '../../assets/Logo_white.png';
import useAuth from '../../Auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEnvelope, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function FirstHomePage() {
    useAuth();
    const navigate = useNavigate();

    const handleSignIn = () => { navigate('/signin'); };
    const handleSignUp = () => { navigate('/signup'); };
    const handleGetStarted = () => { navigate('/signin'); };
    const handleAboutUs = () => { navigate('/aboutus'); };
    const handleContactUs = () => { navigate('/contactus'); };

    return (
        <div className="first-homepage">
            
            {/* Navbar */}
            <nav className="navba">
                <div className="navbar-brand">
                    <img src={logoWhite} alt="Logo" className="mango-logo" />
                </div>
                <div className="navbar-buttons">
                    <button className="navbar-btn" onClick={handleSignIn}>
                        <FontAwesomeIcon icon={faSignInAlt} /> Sign-In
                    </button>
                    <button className="navbar-btn" onClick={handleSignUp}>
                        <FontAwesomeIcon icon={faUserPlus} /> Sign-Up
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section" style={{ backgroundImage: `url(${mangoBackground})` }}>
                <div className="hero-content">
                    <h1 className="hero-heading">Stay Fresh: Monitor Your Mangoes, Minimize Waste!</h1>
                    <p className="hero-subtitle">Your reliable tracking app.</p>
                    <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-FirstHomePage">
                <div className="footer-links">
                    <button className="footer-link" onClick={handleAboutUs}>
                        <FontAwesomeIcon icon={faInfoCircle} /> About Us
                    </button>
                    <button className="footer-link" onClick={handleContactUs}>
                        <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                    </button>
                </div>
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
}

export default FirstHomePage;
