import React, { useEffect, useState, useCallback} from 'react';
import { useNavigate } from 'react-router-dom';
import './aboutus.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import pythonLogo from '../../assets/python.png';
import pytorchLogo from '../../assets/pytorch.png';
import tensorflowLogo from '../../assets/tensorflow.png';
import userProfileImg from '../../assets/profile.jpg'; // Add this line

function AboutUs() {
    const navigate = useNavigate();
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

    // Navigation handlers
    const handleContactUs = () => { navigate('/contactusmain'); };
    const handleAboutUs = () => { navigate('/aboutusmain'); };
    const handleUserProfile = () => { navigate('/profile'); };
    const handlemainhomepage = () => { navigate('/home')}
    const handleDashboard = () => { navigate('/dashboard'); };
    const handleBruiseAreaCalculation = () => { navigate('/bruise'); };
    const handleFeatureAnalysis = () => { navigate('/analysis'); };
    const handleResize = () => { navigate('/resize'); };
    const handleRemoveBackground = () => { navigate('/removebackground'); };

    useEffect(() => {
        
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        });

        // Select elements to observe
        const elements = document.querySelectorAll('.content-section, .framework-item');
        elements.forEach(element => observer.observe(element));

        // Cleanup observer on component unmount
        return () => {
            elements.forEach(element => observer.unobserve(element));
        };
    }, []);

    return (
        <div className="aboutus-page-container">

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
                    <img src={userProfileImg} alt="User Profile" className="user-profile" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={handleUserProfile}>View Profile</button>
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
                    <button className="footer-link" onClick={handleAboutUs}>About Us</button>
                    <button className="footer-link" onClick={handleContactUs}>Contact Us</button>
                </div>
                <p className="footer-address">Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
            </footer>
        </div>
    );
}

export default AboutUs;