/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Verify.css';
import mangoLogo from '../../assets/Logo_black.png';

function Verify() {
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [inputCode, setInputCode] = useState('');

    const handleChangePassword = () => {
        const storedCode = localStorage.getItem('verificationCode'); // Get the code from localStorage

        if (!inputCode) {
            setAlertMessage('Please enter the verification code.');
        } else if (inputCode !== storedCode) {
            setAlertMessage('Incorrect verification code. Please try again.');
        } else {
            setAlertMessage('');
            localStorage.removeItem('verificationCode'); // Clear the code
            navigate('/changepassword');
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleChangePassword();
        }
    };

    return (
        <div className="Verify-container">
            <div className="Verify-box">
                <img src={mangoLogo} alt="Mango Logo" className="Verify-logo" />
                <h1>Verification</h1>
                {alertMessage && <div className="alert-message">{alertMessage}</div>}
                <input
                    type="text"
                    placeholder="Enter your verification code"
                    className="Verify-input"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleChangePassword} className="Verify-button">
                    Verify
                </button>
            </div>
        </div>
    );
}

export default Verify;

// You must input: 6531503110@lamduan.mfu.ac.th
// After that you must input: 123456
