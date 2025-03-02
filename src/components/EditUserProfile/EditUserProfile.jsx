import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditUserProfile.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { UserContext } from '../../UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const EditUserProfile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [setProfileImage] = useState(userInfo.profileImage || userProfileImg);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAboutUs = useCallback(() => navigate('/aboutusmain'), [navigate]);
      const handleContactUs = useCallback(() => navigate('/contactusmain'), [navigate]);
      const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
      const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
      const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
      const handleFeatureAnalysis = useCallback(() => navigate('/analysis'), [navigate]);
      const handleResize = useCallback(() => navigate('/resize'), [navigate]);
      const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
      const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
          
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

    const handleSignOut = useCallback(() => {
      
      // Navigate to sign-in page
      navigate('/logout');
  }, [navigate]);

  const handleNavigation = useCallback((path) => () => navigate(path), [navigate]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  }, [setUserInfo]);

  // eslint-disable-next-line no-unused-vars
  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfileImage(imageURL);
      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, profileImage: imageURL }));
    }
  }, [setProfileImage, setUserInfo]);

  const handleSave = useCallback(async () => {
    const requiredFields = ['name', 'email', 'phone', 'country'];
    const missingFields = requiredFields.filter((field) => !userInfo[field]);

    if (missingFields.length > 0) {
      setErrorMessage(`The following fields cannot be blank: ${missingFields.join(', ')}`);
      return;
    }

    setErrorMessage('');

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        navigate(-1); // Go back to the previous page
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error updating user profile');
      }
    } catch (err) {
      setErrorMessage('Error updating user profile');
    }
  }, [userInfo, navigate]);

  return (
    <div className="edit-page">
      <nav className="edit">
        <div className="edit-brand">
          <img src={mangoLogo} alt="Mango Logo" className="manger-logo" onClick={handlemainhomepage}/>
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
            <button className="navbar-link" onClick={handleBruiseAreaCalculation}>
                <FontAwesomeIcon icon={faCalculator} /> Bruise Area Calculation
            </button>
            <button className="navbar-link" onClick={handleFeatureAnalysis}>
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
            <img src={userProfileImg} alt="User Profile" className="user-profile" onClick={toggleProfileDropdown} />
            {isProfileDropdownOpen && (
                <div className="profile-dropdown">
                    <button className="dropdown-link" onClick={handleUserProfile}>View Profile</button>
                    <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                </div>
            )}
        </div>
      </nav>

      <div className="edit-profile-content">
        <h2 className="edit-title">Edit User Information</h2>
        <div className="edit-container">
          <div className="edit-info">
            <div className="edit-info-row">
              <label className="edit-label">
                <strong>Name:</strong>
                <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} className="edit-input" />
              </label>
              <label className="edit-label">
                <strong>Email:</strong>
                <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} className="edit-input" />
              </label>
            </div>
            <div className="edit-info-row">
              <label className="edit-label">
                <strong>Phone Number:</strong>
                <input type="tel" name="phone" value={userInfo.phone} onChange={handleInputChange} className="edit-input" />
              </label>
              <label className="edit-label">
                <strong>Country:</strong>
                <input type="text" name="country" value={userInfo.country} onChange={handleInputChange} className="edit-input" />
              </label>
            </div>

            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="edit-buttons">
              <button className="edit-button" onClick={handleNavigation(-1)}>Back</button>
              <button className="change-password-button" onClick={handleSave}>Save</button>
            </div>
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

export default EditUserProfile;