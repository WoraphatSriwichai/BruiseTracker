import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfilePage.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { UserContext } from '../../UserContext';

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
          
    // Clear authentication tokens
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    
    // Navigate to sign-in page
    navigate('/signin');
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
          <button className="profile-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
          <button className="profile-link" onClick={() => navigate('/bruise')}>Bruised Area Calculation</button>
          <button className="profile-link" onClick={() => navigate('/analysis')}>Feature Analysis</button>
          <button className="profile-link" onClick={() => navigate('/resize')}>Resize</button>
          <button className="navbar-link" onClick={() => navigate('/removebackground')}>Remove Background</button>
          <button className="profile-link" onClick={() => navigate('/aboutus')}>About Us</button>
          <button className="profile-link" onClick={() => navigate('/contactus')}>Contact Us</button>
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
          <img src={userInfo.profileImage || userProfileImg} alt="Profile" className="profile-userimage" />
          <div className="profile-info">
            <p><strong>Name:</strong> {userInfo.name}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
            <p><strong>Phone Number:</strong> {userInfo.phone}</p>
            <p><strong>Country:</strong> {userInfo.country}</p>
            <div className="profile-buttons">
              <button className="editer-button" onClick={() => navigate('/profile/edit')}>Edit</button>
              <button className="change-userprofilepage-button" onClick={() => navigate('/profile/changepassword')}>Change Password</button>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer-userprofilepage">
        <div className="footer-address">
          <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfilePage;