import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './contactus.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import facebookLogo from '../../assets/facebook.png';
import userProfileImg from '../../assets/profile.jpg'; // Add this line

function ContactUs() {
    const navigate = useNavigate();

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

        const handleSignOut = useCallback(() => {
        
        // Navigate to sign-in page
        navigate('/logout');
    }, [navigate]);

    const handleDashboard = useCallback(() => { navigate('/dashboard'); }, [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => { navigate('/bruise'); }, [navigate]);
    const handleFeatureAnalysis = useCallback(() => { navigate('/analysis'); }, [navigate]);
    const handleResize = useCallback(() => { navigate('/resize'); }, [navigate]);
    const handleRemoveBackground = useCallback(() => { navigate('/removebackground'); }, [navigate]);
    const handleAboutUs = useCallback(() => { navigate('/aboutusmain'); }, [navigate]);
    const handleContactUs = useCallback(() => { navigate('/contactusmain'); }, [navigate]);
    const handleFacebookClick = useCallback(() => { window.open("https://www.facebook.com/IntegratedAgriTechEcosystem", "_blank"); }, []);
    const handleUserProfile = useCallback(() => { navigate('/profile'); }, [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

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
                    <img src={userProfileImg} alt="User Profile" className="user-profile-contactusmain" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={handleUserProfile}>View Profile</button>
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
                        <div className="framework-item" onClick={handleFacebookClick}>
                            <img src={facebookLogo} alt="Facebook Logo" className="framework-logo" />
                            <p>IATE</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="contactuspage-footer">
                <div className="footer-links">
                    <button className="footer-link" onClick={handleAboutUs}>About Us</button>
                    <button className="footer-link" onClick={handleContactUs}>Contact Us</button>
                </div>
                <p className="footer-address">Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
            </footer>
        </div>
    );
}

export default ContactUs;