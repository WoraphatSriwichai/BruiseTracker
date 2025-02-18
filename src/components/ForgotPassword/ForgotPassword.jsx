/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import mangoLogo from '../../assets/Logo_black.png';

function ForgotPassword() {
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const emailRef = useRef(null);

    const handleSendEmail = useCallback(() => {
        const email = emailRef.current.value.trim();

        if (!email) {
            setAlertMessage('Please enter your email address.');
        } else {
            setAlertMessage('');
            
            const verificationCode = '123456'; // Fixed 6-digit code for testing
            localStorage.setItem('verificationCode', verificationCode);

            console.log(`Your verification code is: ${verificationCode}`); // Simulated email

            navigate('/verify'); // Navigate to the Verify page
        }
    }, [navigate]);

    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') {
            handleSendEmail();
        }
    }, [handleSendEmail]);

    return (
        <div className="ForgotPassword-container">
            <div className="ForgotPassword-box">
                <img src={mangoLogo} alt="Mango Logo" className="ForgotPassword-logo" />
                <h1>Send Email</h1>
                {alertMessage && <div className="alert-message">{alertMessage}</div>}
                <input
                    type="text"
                    ref={emailRef}
                    placeholder="Enter your email"
                    className="ForgotPassword-input"
                    onKeyDown={handleKeyDown}
                />
                <button className="ForgotPassword-button" onClick={handleSendEmail}>
                    Send Email
                </button>
            </div>
        </div>
    );
}

export default ForgotPassword;
