import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './aboutus.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import pythonLogo from '../../assets/python.png';
import pytorchLogo from '../../assets/pytorch.png';
import tensorflowLogo from '../../assets/tensorflow.png';
import userProfileImg from '../../assets/mango_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {

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
        <div className="aboutus-page-container">
            <nav className="aboutus-navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="navbar-logo" onClick={() => handleNavigation('/home')} />
                </div>

                <div className="navbar-links">
                    <button className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => handleNavigation('/dashboard') }> <FontAwesomeIcon icon={faHome} /> Home </button>
                    <button className={`navbar-link ${location.pathname === '/resize' ? 'active' : ''}`} onClick={() => handleNavigation('/resize')}> <FontAwesomeIcon icon={faExpand} />Resize</button>
                    <button className={`navbar-link ${location.pathname === '/removebackground' ? 'active' : ''}`} onClick={() => handleNavigation('/removebackground')}> <FontAwesomeIcon icon={faEraser} />Remove Background</button>
                    <button className={`navbar-link ${location.pathname === '/bruise' ? 'active' : ''}`} onClick={() => handleNavigation('/bruise')}> <FontAwesomeIcon icon={faCalculator} />Bruise Area Calculation</button>
                    <button className={`navbar-link ${location.pathname === '/analysis' ? 'active' : ''}`} onClick={() => handleNavigation('/analysis')}> <FontAwesomeIcon icon={faChartBar} />Feature Analysis</button>
                    <button className={`navbar-link ${location.pathname === '/aboutusmain' ? 'active' : ''}`} onClick={() => handleNavigation('/aboutusmain')}> <FontAwesomeIcon icon={faInfoCircle} />About Us</button>
                    <button className={`navbar-link ${location.pathname === '/contactusmain' ? 'active' : ''}`} onClick={() => handleNavigation('/contactusmain')}> <FontAwesomeIcon icon={faEnvelope} />Contact Us</button>
                </div>

                <div className="navbar-profile">
                    <img src={userProfileImg} alt="User Profile" className="user-profile-aboutusmain" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={() => handleNavigation('/profile')}>View Profile</button>
                            <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    )}
                </div>
            </nav>

            <header className="aboutus-hero" style={{ backgroundImage: `url(${mangoBackground})` }}>
                <h1 className="hero-title">About Us</h1>
            </header>

            <main className="aboutus-content">
                <div className="content-section">
                    <h2 className="content-title">Mangoers</h2>
                    <p className="content-description">
                        Mangoers Bruise Tracker, developed at Mae Fah Luang University, specializes in the precise detection and analysis of mango bruise areas. Utilizing cutting-edge computer vision, deep learning (DL), and machine learning (ML) techniques, our platform empowers retailers to streamline mango quality assessment. This automated bruise detection service delivers actionable insights to support optimal quality control and decision-making.
                    </p>
                </div>

                <section className="frameworks-section">
                    <h3 className="frameworks-title">Frameworks We Use</h3>
                    <div className="frameworks-logos">
                        <div className="framework-item">
                            <img src={pythonLogo} alt="Python Logo" className="framework-logo" />
                            <p>Python</p>
                        </div>
                        <div className="framework-item">
                            <img src={pytorchLogo} alt="PyTorch Logo" className="framework-logo" />
                            <p>PyTorch</p>
                        </div>
                        <div className="framework-item">
                            <img src={tensorflowLogo} alt="TensorFlow Logo" className="framework-logo" />
                            <p>TensorFlow</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="aboutus-footer">
                <div className="footer-links">
                    <button className="footer-link" onClick={() => handleNavigation('/aboutusmain')}> <FontAwesomeIcon icon={faInfoCircle} /> About Us</button>
                    <button className="footer-link" onClick={() => handleNavigation('/contactusmain')}> <FontAwesomeIcon icon={faEnvelope} />  Contact Us</button>
                </div>
                <p className="footer-address">Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
            </footer>
        </div>
    );
}

export default AboutUs;