import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutUsPage.css';
import mangoBackground from '../../assets/differentmango.jpg';
import mangoLogo from '../../assets/Logo_white.png';
import pythonLogo from '../../assets/python.png';
import pytorchLogo from '../../assets/pytorch.png';
import tensorflowLogo from '../../assets/tensorflow.png';

function AboutUsPage() {
    const navigate = useNavigate();

    // Navigation handlers
    const handleSignIn = () => { navigate('/signin'); };
    const handleContactUs = () => { navigate('/contactuspage'); };
    const handleAboutUs = () => { navigate('/aboutuspage'); };
    const handlemainhomepage = () => { navigate('/mainhomepage')}

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
            <nav className="aboutus-navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="navbar-logo" onClick={handlemainhomepage} />
                </div>
                <div className="navbar-actions">
                    <button className="navbar-button" onClick={handleSignIn}>Sign-In</button>
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

export default AboutUsPage;