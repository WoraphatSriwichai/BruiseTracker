import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FirstHomePage.css';
import mangoBackground from '../../assets/differentmango.jpg';
import logoWhite from '../../assets/Logo_white.png';
import { UnAuth, useAuth } from '../../Auth';

function FirstHomePage() {
    useAuth();
    const navigate = useNavigate();

    const handleSignIn = () => { navigate('/signin'); };
    const handleSignUp = () => { navigate('/signup'); };
    const handleGetStarted = () => { navigate('/signin'); };
    const handleAboutUs = () => { navigate('/aboutuspage'); };
    const handleContactUs = () => { navigate('/contactuspage'); };

    return (
        <div className="first-homepage">
            
            {/* Navbar */}
            <nav className="navba">
                <div className="navbar-brand">
                    <img src={logoWhite} alt="Logo" className="mango-logo" />
                </div>
                <div className="navbar-buttons">
                    <button className="navbar-btn" onClick={handleSignIn}>Sign-In</button>
                    <button className="navbar-btn" onClick={handleSignUp}>Sign-Up</button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="hero-section" style={{ backgroundImage: `url(${mangoBackground})` }}>
                <div className="hero-content">
                    <h1>Stay Fresh: Monitor Your Mangoes, Minimize Waste!</h1>
                    <p>Your reliable tracking app.</p>
                    <button className="get-started-btn" onClick={handleGetStarted}>Get Started</button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-FirstHomePage">
                <div className="footer-links">
                    <button className="footer-link" onClick={handleAboutUs}>About Us</button>
                    <button className="footer-link" onClick={handleContactUs}>Contact Us</button>
                </div>
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
}

export default FirstHomePage;