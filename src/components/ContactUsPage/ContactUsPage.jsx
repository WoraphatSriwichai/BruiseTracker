import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ContactUsPage.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import facebookLogo from '../../assets/facebook.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEnvelope, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function ContactUsPage() {
    const navigate = useNavigate();

    const handleSignIn = useCallback(() => { navigate('/signin'); }, [navigate]);
    const handleSignUp = useCallback(() => { navigate('/signup'); }, [navigate]);
    const handleAboutUs = useCallback(() => { navigate('/aboutus'); }, [navigate]);
    const handleContactUs = useCallback(() => { navigate('/contactus'); }, [navigate]);
    const handleFacebookClick = useCallback(() => { window.open("https://www.facebook.com/IntegratedAgriTechEcosystem", "_blank"); }, []);
    const handleLogoClick = () => { navigate('/'); }; // Add this handler

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });

        const elements = document.querySelectorAll('.content-section, .framework-item');
        elements.forEach(element => observer.observe(element));

        return () => {
            elements.forEach(element => observer.unobserve(element));
        };
    }, []);

    return (
        <div className="contactus-page-container">
            <nav className="contactus-navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="navbar-logo" onClick={handleLogoClick}/>
                </div>
                <div className="navbar-actions">
                    <button className="navbar-button" onClick={handleSignIn}> <FontAwesomeIcon icon={faSignInAlt} /> Sign-In</button>
                    <button className="navbar-button" onClick={handleSignUp}> <FontAwesomeIcon icon={faUserPlus} /> Sign-Up</button>
                </div>
            </nav>

            <header className="contactus-hero" style={{ backgroundImage: `url(${mangoBackground})` }}>
                <h1 className="hero-title">Contact Us</h1>
            </header>

            <main className="contactus-content">
                <div className="content-section">
                    <h2 className="content-title">How can we help you?</h2>
                    <p className="content-description">
                        Purpose
                        The "Need Help?" section serves as a quick-access area for users seeking support or information. It's a critical component for building trust and encouraging engagement by providing clear communication channels.
                    </p>
                </div>

                <section className="frameworks-section">
                    <h3 className="frameworks-title">Contact Us</h3>
                    <div className="frameworks-logos">
                        <div className="framework-item" onClick={handleFacebookClick}>
                            <img src={facebookLogo} alt="Facebook Logo" className="framework-logo" />
                            <p>IATE</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="aboutus-footer">
                <div className="footer-links">
                    <button className="footer-link" onClick={handleAboutUs}> <FontAwesomeIcon icon={faInfoCircle} /> About Us</button>
                    <button className="footer-link" onClick={handleContactUs}> <FontAwesomeIcon icon={faEnvelope} /> Contact Us</button>
                </div>
                <p className="footer-address">Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
            </footer>
        </div>
    );
}

export default ContactUsPage;