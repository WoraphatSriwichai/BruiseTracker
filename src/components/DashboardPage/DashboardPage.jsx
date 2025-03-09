import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
    const navigate = useNavigate();
    const [operationHistory, setOperationHistory] = useState([]);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [activeButton, setActiveButton] = useState('home'); // Set default active button

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

    const handleNavigation = useCallback((path, buttonName) => {
        navigate(path);
        setActiveButton(buttonName);
    }, [navigate]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:5000/user/history', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setOperationHistory(data);
                } else {
                    console.error('Failed to fetch history');
                }
            } catch (err) {
                console.error('Error fetching history:', err);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="dashboard-page">
            <nav className="navbar-dashboard">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="manger-logo" onClick={() => handleNavigation('/home', 'home')} />
                </div>
                <div className="navbar-links">
                    <button className={`navbar-link ${activeButton === 'home' ? 'active' : ''}`} onClick={() => handleNavigation('/dashboard', 'home')}> <FontAwesomeIcon icon={faHome} />Home</button>
                    <button className={`navbar-link ${activeButton === 'resize' ? 'active' : ''}`} onClick={() => handleNavigation('/resize', 'resize')}> <FontAwesomeIcon icon={faExpand} />Resize</button>
                    <button className={`navbar-link ${activeButton === 'removebackground' ? 'active' : ''}`} onClick={() => handleNavigation('/removebackground', 'removebackground')}> <FontAwesomeIcon icon={faEraser} />Remove Background</button>
                    <button className={`navbar-link ${activeButton === 'bruise' ? 'active' : ''}`} onClick={() => handleNavigation('/bruise', 'bruise')}><FontAwesomeIcon icon={faCalculator} />Bruised Area Calculation</button>
                    <button className={`navbar-link ${activeButton === 'analysis' ? 'active' : ''}`} onClick={() => handleNavigation('/analysis', 'analysis')}> <FontAwesomeIcon icon={faChartBar} />Feature Analysis</button>
                    <button className={`navbar-link ${activeButton === 'aboutus' ? 'active' : ''}`} onClick={() => handleNavigation('/aboutusmain', 'aboutus')}> <FontAwesomeIcon icon={faInfoCircle} />About Us</button>
                    <button className={`navbar-link ${activeButton === 'contactus' ? 'active' : ''}`} onClick={() => handleNavigation('/contactusmain', 'contactus')}><FontAwesomeIcon icon={faEnvelope} />Contact Us</button>
                </div>
                
                <div className="navbar-profile">
                    <img src={userProfileImg} alt="User Profile" className="user-profile" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                        <div className="profile-dropdown">
                            <button className="dropdown-link" onClick={() => handleNavigation('/profile', 'profile')}>View Profile</button>
                            <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    )}
                </div>
            </nav>
            <div className="dashboard-content">
                <h2 className="dashboard-title">Home</h2>
                <div className="dashboard-table-container">
                    <table className="dashboard-table">
                        <thead>
                            <tr>
                                <th>Operation Type</th>
                                <th>User Name</th>
                                <th>Organization</th>
                                <th>Date / Time</th>
                            </tr>
                        </thead>
                        <tbody className="dashboard-table-body">
                            {operationHistory.length > 0 ? (
                                operationHistory.map((operation, index) => (
                                    <tr key={index}>
                                        <td>{operation.operation_type}</td>
                                        <td>{operation.username}</td>
                                        <td>{operation.organization}</td>
                                        <td>{new Date(operation.time_stamp).toLocaleString()}</td>
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
            </div>

            {/* Footer */}
            <footer className="footer-mainhomepage">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default DashboardPage;