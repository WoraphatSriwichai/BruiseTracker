import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './contactus.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import facebookLogo from '../../assets/facebook.png';
import userProfileImg from '../../assets/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

    const handleNavigation = (path) => {
        navigate(path);
    };

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
            {/* Navbar */}
            <nav className="contactus-navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="navbar-logo" onClick={() => handleNavigation('/home')} />
                </div>

                <div className="navbar-links">
                    <button className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('/dashboard')}>
                        <FontAwesomeIcon icon={faHome} /> Home
                    </button>
                    <button className={`navbar-link ${location.pathname === '/bruise' ? 'active' : ''}`} onClick={() => handleNavigation('/bruise')}>
                        <FontAwesomeIcon icon={faCalculator} /> Bruise Area Calculation
                    </button>
                    <button className={`navbar-link ${location.pathname === '/analysis' ? 'active' : ''}`} onClick={() => handleNavigation('/analysis')}>
                        <FontAwesomeIcon icon={faChartBar} /> Feature Analysis
                    </button>
                    <button className={`navbar-link ${location.pathname === '/resize' ? 'active' : ''}`} onClick={() => handleNavigation('/resize')}>
                        <FontAwesomeIcon icon={faExpand} /> Resize
                    </button>
                    <button className={`navbar-link ${location.pathname === '/removebackground' ? 'active' : ''}`} onClick={() => handleNavigation('/removebackground')}>
                        <FontAwesomeIcon icon={faEraser} /> Remove Background
                    </button>
                    <button className={`navbar-link ${location.pathname === '/aboutusmain' ? 'active' : ''}`} onClick={() => handleNavigation('/aboutusmain')}>
                        <FontAwesomeIcon icon={faInfoCircle} /> About Us
                    </button>
                    <button className={`navbar-link ${location.pathname === '/contactusmain' ? 'active' : ''}`} onClick={() => handleNavigation('/contactusmain')}>
                        <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                    </button>
                </div>

                <div className="navbar-profile">
                    <img src={userProfileImg} alt="User Profile" className="user-profile-contactusmain" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={() => handleNavigation('/profile')}>View Profile</button>
                            <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    )}
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
                        <div className="framework-item" onClick={() => window.open("https://www.facebook.com/IntegratedAgriTechEcosystem", "_blank")}>
                            <img src={facebookLogo} alt="Facebook Logo" className="framework-logo" />
                            <p>IATE</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="contactuspage-footer">
                <div className="footer-links">
                    <button className="footer-link" onClick={() => handleNavigation('/aboutusmain')}>
                        <FontAwesomeIcon icon={faInfoCircle} /> About Us
                    </button>
                    <button className="footer-link" onClick={() => handleNavigation('/contactusmain')}>
                        <FontAwesomeIcon icon={faEnvelope} /> Contact Us
                    </button>
                </div>
                <p className="footer-address">Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
            </footer>
        </div>
    );
}

export default ContactUs;