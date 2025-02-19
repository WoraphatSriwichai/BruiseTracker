/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignInPage.css';
import mangoLogo from '../../assets/Logo_black.png';
import useAuth from '../../Auth';

function SignInPage() {
useAuth();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [passwordAlert, setPasswordAlert] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleForgotPassword = () => { navigate('/forgotpassword'); };
  const handleSignUpClick = () => { navigate('/signup'); };

  const handleSignInClick = async () => {
    const usernameOrEmail = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!usernameOrEmail || !password) {
      setAlertMessage('The field cannot be blank');
    } else if (password.length < 8) {
      setPasswordAlert('Password must be at least 8 characters');
    } else {
      setAlertMessage('');
      setPasswordAlert('');

      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: usernameOrEmail, password }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          navigate('/home'); // Redirect to main page after successful sign-in
        } else {
          const errorData = await response.json();
          setAlertMessage(errorData.error || 'Error logging in');
          console.error('Error details:', errorData.details);
        }
      } catch (err) {
        setAlertMessage(err.message);
        console.error('Error details:', err.message);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignInClick();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <img src={mangoLogo} alt="Mango Logo" className="signin-logo" />
        <h1>Sign-In</h1>

        <input
          type="text"
          id="username"
          placeholder="Enter your username or email"
          className="signin-input"
          onKeyDown={handleKeyDown}
        />

        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            placeholder="Enter your password"
            className="signin-input password-input"
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        {alertMessage && <div className="alert-message">{alertMessage}</div>}
        {passwordAlert && <div className="password-alert">{passwordAlert}</div>}

        <div className="remember-me">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="checkmark"></span>
            Remember Me
          </label>
        </div>

        <button className="signin-button" onClick={handleSignInClick}>
          Sign-in
        </button>
        <div className="signin-links">
          <a onClick={handleForgotPassword} className="forgot-password">
            Forgot Password?
          </a>
          <a onClick={handleSignUpClick} className="signup-link">
            Sign-up
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignInPage;