import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { UserContext } from '../../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const UserProfilePage = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };
      
  const handleSignOut = useCallback(() => {
    navigate('/logout');
  }, [navigate]);

  const handleUserProfile = () => {
    navigate('/profile');
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:5000/user/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserInfo(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Error fetching user profile');
        }
      } catch (err) {
        setError('Error fetching user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [setUserInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="profile-page">
      <nav className="profile">
        <div className="profile-brand">
          <img src={mangoLogo} alt="Mango Logo" className="manger-logo" onClick={() => navigate('/home')} />
        </div>
        <div className="navbar-links">
          <button className="navbar-link" onClick={() => navigate('/dashboard')}>
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
          <button className="navbar-link" onClick={() => navigate('/bruise')}>
            <FontAwesomeIcon icon={faCalculator} /> Bruised Area Calculation
          </button>
          <button className="navbar-link" onClick={() => navigate('/analysis')}>
            <FontAwesomeIcon icon={faChartBar} /> Feature Analysis
          </button>
          <button className="navbar-link" onClick={() => navigate('/resize')}>
            <FontAwesomeIcon icon={faExpand} /> Resize
          </button>
          <button className="navbar-link" onClick={() => navigate('/removebackground')}>
            <FontAwesomeIcon icon={faEraser} /> Remove Background
          </button>
          <button className="navbar-link" onClick={() => navigate('/aboutusmain')}>
            <FontAwesomeIcon icon={faInfoCircle} /> About Us
          </button>
          <button className="navbar-link" onClick={() => navigate('/contactusmain')}>
            <FontAwesomeIcon icon={faEnvelope} /> Contact Us
          </button>
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

     <div className="user-profile-content">
  <h2 className="profile-title">User Profile</h2>
  <div className="profile-container">
    <div className="profile-info">
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
      <p><strong>Phone Number:</strong> {userInfo.phone}</p>
      <p><strong>Country:</strong> {userInfo.country}</p>
    </div>
    <div className="profile-buttons">
      <button className="editer-button" onClick={() => navigate('/profile/edit')}>Edit Profile</button>
      <button className="change-userprofilepage-button" onClick={() => navigate('/profile/changepassword')}>Change Password</button>
    </div>
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

export default UserProfilePage;