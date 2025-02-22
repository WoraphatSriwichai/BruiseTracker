import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [operationHistory, setOperationHistory] = useState([]);
    const [exportProgress, setExportProgress] = useState(0);

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

    const handleAboutUs = useCallback(() => { navigate('/aboutusmain'); }, [navigate]);
    const handleContactUs = useCallback(() => { navigate('/contactusmain'); }, [navigate]);
    const handleUserProfile = useCallback(() => { navigate('/profile'); }, [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => { navigate('/bruise'); }, [navigate]);
    const handleFeatureAnalysis = useCallback(() => { navigate('/analysis'); }, [navigate]);
    const handleShowAreaCalculation = useCallback(() => { navigate('/showarea/accuracy'); }, [navigate]);
    const handleResize = useCallback(() => { navigate('/resize'); }, [navigate]);
    const handleRemoveBackground = useCallback(() => { navigate('/removebackground'); }, [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem('operationHistory')) || [];
        setOperationHistory(history);

        const handleBeforeUnload = () => {
            localStorage.removeItem('operationHistory');
            setOperationHistory([]);
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const handleExportCSV = useCallback(() => {
        setExportProgress(0);
        const interval = setInterval(() => {
            setExportProgress(prevProgress => {
                if (prevProgress >= 100) {
                    clearInterval(interval);
                    navigate('/exportcsv');
                    return 100;
                }
                return prevProgress + 10;
            });
        }, 100);
    }, [navigate]);

    return (
        <div className="dashboard-page">
            <nav className="navbar-dashboard">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="manger-logo" onClick={handlemainhomepage}/>
                </div>
                <div className="navbar-links">
                    <button className="navbar-link">Dashboard</button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}>Bruised Area Calculation</button>
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
            <div className="dashboard-content">
                <h2 className="dashboard-title">Dashboard</h2>
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Operation Type</th>
                                <th>Date / Time</th>
                                <th>Results</th>
                                <th>Download</th>
                            </tr>
                        </thead>
                        <tbody className="dashboard-table-body">
                            {operationHistory.length > 0 ? (
                                operationHistory.map((operation, index) => (
                                    <tr key={index}>
                                        <td>{operation.type}</td>
                                        <td>{operation.date}</td>
                                        <td><button className="btn view-btn" onClick={handleShowAreaCalculation}>View Result</button></td>
                                        <td><button className="btn export-btn" onClick={handleExportCSV}>Export CSV</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No information available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {exportProgress > 0 && exportProgress < 100 && (
                    <div className="export-progress-container">
                        <div className="export-progress">Exporting CSV... {exportProgress}%</div>
                    </div>
                )}
            </div>
            <footer className="footering">
                <div className="footering-links"></div>
                <div className="footering-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage;