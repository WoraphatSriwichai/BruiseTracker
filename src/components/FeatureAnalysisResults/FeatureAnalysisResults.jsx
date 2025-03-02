import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureAnalysisResults.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const FeatureAnalysisResults = () => {
    const navigate = useNavigate();

    const [checked, setChecked] = useState({
        glcm: true,
        rgb: true,
        hsv: true,
        perimeter: true,
    });

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {      
        navigate('/logout');
    }, [navigate]);

    const [data, setData] = useState([]);
    const [isExporting, setIsExporting] = useState(false);
    const [exportProgress, setExportProgress] = useState(0);

    useEffect(() => {
        const storedFiles = localStorage.getItem('uploadedFiles');
        if (storedFiles) {
            setData(JSON.parse(storedFiles));
        }
    }, []);

    const handleExportFeatureSuccessful = useCallback(() => {
        if (data.length === 0) {
            alert("No information to export");
        } else {
            setIsExporting(true);
            const interval = setInterval(() => {
                setExportProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        navigate('/exportfeature');
                        return 100;
                    }
                    return prevProgress + 10;
                });
            }, 300);
        }
    }, [data, navigate]);

    const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/analysis'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
    const handleAboutUs = useCallback(() => navigate('/aboutusmain'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactusmain'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

    const handleCheckboxChange = useCallback((feature) => {
        setChecked((prevChecked) => ({
            ...prevChecked,
            [feature]: !prevChecked[feature],
        }));
    }, []);

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="bruise-page">
            
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-brand">
                    <img
                        src={mangoLogo}
                        alt="Mango Logo"
                        className="mango-logo"
                        onClick={handlemainhomepage}
                    />
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
                    <button
                        className="navbar-link"
                        onClick={handleBruiseAreaCalculation}
                    >
                        <FontAwesomeIcon icon={faCalculator} /> Bruised Area Calculation
                    </button>
                    <button
                        className="navbar-link active"
                        onClick={handleFeatureAnalysis}
                    >
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
                    <img
                        src={userProfileImg}
                        alt="User Profile"
                        className="user-profile"
                        onClick={toggleProfileDropdown}
                    />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={handleUserProfile}>
                                View Profile
                            </button>
                            <button className="dropdown-link" onClick={handleSignOut}>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            {/* Content */}
            <div className="bruise-content">
                <h1 className="bruis-title">Feature Analysis Results</h1>
                <div className="feature-selection">
                    <span>Selected Features :</span>
                    <label>
                        <input
                            type="checkbox"
                            checked={checked.glcm}
                            onChange={() => handleCheckboxChange("glcm")}
                        />
                        Gray-Level Co-occurrence Matrix (GLCM)
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={checked.rgb}
                            onChange={() => handleCheckboxChange("rgb")}
                        />
                        RGB
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={checked.hsv}
                            onChange={() => handleCheckboxChange("hsv")}
                        />
                        HSV
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={checked.perimeter}
                            onChange={() => handleCheckboxChange("perimeter")}
                        />
                        Perimeter
                    </label>
                </div>

                <div className="results-table">
                    {data.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Image ID</th>
                                    <th>Red Mean</th>
                                    <th>Green Mean</th>
                                    <th>Blue Mean</th>
                                    <th>GLCM Contrast</th>
                                    <th>GLCM Energy</th>
                                    <th>GLCM Homogeneity</th>
                                    <th>Area</th>
                                    <th>Perimeter</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row) => (
                                    <tr key={row.id}>
                                        <td>{row.name}</td>
                                        <td>{row.red_mean || "-"}</td>
                                        <td>{row.green_mean || "-"}</td>
                                        <td>{row.blue_mean || "-"}</td>
                                        <td>
                                            {row.glcm_contrast ? row.glcm_contrast.toFixed(3) : "-"}
                                        </td>
                                        <td>
                                            {row.glcm_energy ? row.glcm_energy.toFixed(3) : "-"}
                                        </td>
                                        <td>
                                            {row.glcm_homogeneity
                                                ? row.glcm_homogeneity.toFixed(3)
                                                : "-"}
                                        </td>
                                        <td>{row.area || "-"}</td>
                                        <td>{row.perimeter || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="no-info-box">No information available</div>
                    )}
                </div>

                {/* Actions */}
                <div className="action-buttons">
                    <button className="bt backkk-bt" onClick={handleFeatureAnalysis}>
                        Back
                    </button>
                    <button
                        className="bt export-bt"
                        onClick={handleExportFeatureSuccessful}
                    >
                        Export csv
                    </button>
                </div>

                {isExporting && (
                    <div className="export-progress">
                        <p>Exporting CSV... {exportProgress}%</p>
                    </div>
                )}
            </div>

            {/* Scroll to Top Button */}
            <button
                className={`scroll-to-top ${showScrollButton ? 'show' : ''}`}
                onClick={scrollToTop}
            >
                ↑
            </button>

            {/* Footer */}
            <footer className="footer-mainhomepage">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default FeatureAnalysisResults;