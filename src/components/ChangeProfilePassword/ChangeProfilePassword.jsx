import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChangeProfilePassword.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/mango_profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CryptoJS from 'crypto-js';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const ChangeProfilePassword = () => {
  const navigate = useNavigate();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleUserProfile = useCallback(() => navigate("/profile"), [navigate]);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [passwordLengthAlert, setPasswordLengthAlert] = useState(''); // New state for password length alert
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResize = useCallback(() => {
    navigate('/resize');
  }, [navigate]);

  const handleRemoveBackground = useCallback(() => {
    navigate('/removebackground');
  }, [navigate]);

  const handleNewPasswordUpdate = useCallback(async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setAlertMessage('The field cannot be blank');
    } else if (newPassword.length < 8) {
      setPasswordLengthAlert('Password must be at least 8 characters'); // Check password length
    } else if (newPassword !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setPasswordLengthAlert(''); // Clear password length alert
    } else {
      setAlertMessage('');
      setPasswordLengthAlert(''); // Clear all alerts

      try {
        const secretKey = 'bbK9uUad4AveXz7hsxeW4k9a2YFmIAAlbosjjLh0FDw='; // Use a secure key
        const encryptedCurrentPassword = CryptoJS.AES.encrypt(currentPassword, secretKey).toString();
        const encryptedNewPassword = CryptoJS.AES.encrypt(newPassword, secretKey).toString();

        const response = await fetch('http://localhost:5000/change-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({ currentPassword : encryptedCurrentPassword, newPassword: encryptedNewPassword }),
        });

        if (response.ok) {
          localStorage.setItem('signupPassword', newPassword); // Store the new password in local storage
          navigate('/newpassword'); // Navigate to the password update confirmation page
        } else {
          const errorData = await response.json();
          setAlertMessage(errorData.error || 'Error changing password');
          console.error('Error details:', errorData.details);
        }
      } catch (err) {
        setAlertMessage('Error changing password');
        console.error('Error details:', err.message);
      }
    }
  }, [currentPassword, newPassword, confirmPassword, navigate]);

  const toggleVisibility = useCallback((field) => {
    if (field === 'currentPassword') {
      setShowCurrentPassword((prev) => !prev);
    } else if (field === 'newPassword') {
      setShowNewPassword((prev) => !prev);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword((prev) => !prev);
    }
  }, []);

  const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

  const handleSignOut = useCallback(() => {
  
  // Navigate to sign-in page
  navigate('/logout');
  }, [navigate]);

  return (
    <div className="change-profilepassword-page">
      <nav className="profile">
        <div className="profile-brand">
          <img
            src={mangoLogo}
            alt="Mango Logo"
            className="manger-logo"
            onClick={handlemainhomepage}
          />
        </div>

        <div className="navbar-links">
          <button
            className="navbar-link"
            onClick={() => navigate("/dashboard")}
          >
            {" "}
            <FontAwesomeIcon icon={faHome} /> Home
          </button>
          <button className="navbar-link" onClick={handleResize}>
            {" "}
            <FontAwesomeIcon icon={faExpand} />
            Resize
          </button>
          <button className="navbar-link" onClick={handleRemoveBackground}>
            {" "}
            <FontAwesomeIcon icon={faEraser} /> Remove Background
          </button>
          <button className="navbar-link" onClick={() => navigate("/bruise")}>
            {" "}
            <FontAwesomeIcon icon={faCalculator} />
            Bruised Area Calculation
          </button>
          <button className="navbar-link" onClick={() => navigate("/analysis")}>
            {" "}
            <FontAwesomeIcon icon={faChartBar} />
            Feature Analysis
          </button>
          <button
            className="navbar-link"
            onClick={() => navigate("/aboutusmain")}
          >
            {" "}
            <FontAwesomeIcon icon={faInfoCircle} />
            About Us
          </button>
          <button
            className="navbar-link"
            onClick={() => navigate("/contactusmain")}
          >
            {" "}
            <FontAwesomeIcon icon={faEnvelope} />
            Contact Us
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

      <div className="change-password-content">
        <h2 className="change-password-title">Change Password</h2>
        <div className="change-password-container">
          {alertMessage && <div className="alert-message">{alertMessage}</div>}
          {passwordLengthAlert && (
            <div className="alert-message">{passwordLengthAlert}</div>
          )}{" "}
          {/* Display password length alert */}
          <div className="profilepassword-wrapper">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter current password"
              className="ChangePassword-input"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => toggleVisibility("currentPassword")}
            >
              <FontAwesomeIcon
                icon={showCurrentPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          <div className="profilepassword-wrapper">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="ChangePassword-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => toggleVisibility("newPassword")}
            >
              <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              className="ChangePassword-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => toggleVisibility("confirmPassword")}
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
          <button
            className="save-profilepassword-button"
            onClick={handleNewPasswordUpdate}
          >
            Save Password
          </button>
          <button className="ban-button" onClick={() => navigate("/profile")}>
            Cancel
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-mainhomepage">
        <div className="footer-address">
          <p>
            Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChangeProfilePassword;