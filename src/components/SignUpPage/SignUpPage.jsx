// filepath: /e:/Bruise_Tracker/mango-bruise-area/src/components/SignUpPage/SignUpPage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignUpPage.css';
import mangoLogo from '../../assets/Logo_black.png';
import useAuth from '../../Auth';

function SignUpPage() {
    useAuth();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [passwordAlert, setPasswordAlert] = useState(''); // Password alert state

  // Create refs for form inputs
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSignInClick = () => {
    navigate('/signin');
  };

  const handleSignUpClick = async () => {
    const username = usernameRef.current ? usernameRef.current.value.trim() : '';
    const email = emailRef.current ? emailRef.current.value.trim() : '';
    const password = passwordRef.current ? passwordRef.current.value.trim() : '';
    const confirmPassword = confirmPasswordRef.current ? confirmPasswordRef.current.value.trim() : '';
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!username || !email || !password || !confirmPassword) {
      setAlertMessage('The field cannot be blank');
    } else if (!emailRegex.test(email)) {
      setAlertMessage('Invalid email format');
    } else if (password.length < 8) {
      setPasswordAlert('Password must be at least 8 characters');
    } else if (password !== confirmPassword) {
      setAlertMessage('Passwords do not match');
      setPasswordAlert('');
    } else {
      setAlertMessage('');
      setPasswordAlert('');
  
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
        });
  
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          navigate('/signin'); // Redirect to sign-in page
        } else {
          const errorData = await response.json();
          setAlertMessage(errorData.error || 'Error registering user');
          console.error('Error details:', errorData.details);
        }
      } catch (err) {
        setAlertMessage('Error registering user');
        console.error('Error details:', err.message);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSignUpClick();
    }
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={mangoLogo} alt="Mango Logo" className="signup-logo" />
        <h1>Sign-Up</h1>

        {/* Display alert message if any error occurs */}
        {alertMessage && <div className="alert-message">{alertMessage}</div>}

        <input
          type="text"
          id="username"
          placeholder="Enter your username"
          className="signup-input"
          ref={usernameRef}
          onKeyDown={handleKeyDown}
        />
        <input
          type="text"
          id="email"
          placeholder="Enter your email"
          className="signup-input"
          ref={emailRef}
          onKeyDown={handleKeyDown}
        />
        <div className="password-container">
          <input
            type={passwordVisibility.password ? 'text' : 'password'}
            id="password"
            placeholder="Create a password"
            className="signup-input"
            ref={passwordRef}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => togglePasswordVisibility('password')}
          >
            <FontAwesomeIcon icon={passwordVisibility.password ? faEyeSlash : faEye} />
          </button>
        </div>
        <div className="password-container">
          <input
            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            placeholder="Confirm a password"
            className="signup-input"
            ref={confirmPasswordRef}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="toggle-password"
            onClick={() => togglePasswordVisibility('confirmPassword')}
          >
            <FontAwesomeIcon icon={passwordVisibility.confirmPassword ? faEyeSlash : faEye} />
          </button>
        </div>

        {/* Move the password alert here, under the confirm password button */}
        {passwordAlert && <div className="password-alert">{passwordAlert}</div>}

        <button onClick={handleSignUpClick} className="signup-button">
          Sign-up
        </button>
        <div className="signup-links">
          <a onClick={handleSignInClick} className="signup-link">
            Already have an account?
          </a>
          <a onClick={handleSignInClick} className="signup-link">
            Sign-in
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;