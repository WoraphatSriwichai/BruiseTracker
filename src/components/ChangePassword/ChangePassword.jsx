/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useRef } from 'react';
import './ChangePassword.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom'; // Importing react-router-dom for navigation
import mangoLogo from '../../assets/Logo_black.png'; // Update the path if needed for the mango logo
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesome icons
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; // Import eye icons for showing/hiding password

function ChangePassword() {
    const navigate = useNavigate(); // Hook for navigation
    const [alertMessage, setAlertMessage] = useState(''); // State to hold alert messages
    const [passwordAlert, setPasswordAlert] = useState(''); // State to hold password validation alert
    const [passwordVisibility, setPasswordVisibility] = useState({ // State to toggle password visibility
        newPassword: false,
        confirmPassword: false
    });

    const handleFirstHomePage = () => {
    navigate("/");
    };

    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // Function to toggle visibility of password fields
    const toggleVisibility = useCallback((field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field] // Toggle visibility for the selected password field
        }));
    }, []);

    // Function to handle password change and validation
    const handleChangePasswordUpdate = useCallback(async () => {
        const newPassword = newPasswordRef.current.value.trim(); // Get new password value
        const confirmPassword = confirmPasswordRef.current.value.trim(); // Get confirm password value

        if (!newPassword || !confirmPassword) { // Check if any field is blank
            setAlertMessage('The field cannot be blank'); // Show alert if any field is empty
            setPasswordAlert(''); // Clear password length alert if any field is blank
        } else if (newPassword !== confirmPassword) { // Check if passwords match
            setAlertMessage('Passwords do not match'); // Show alert if passwords don't match
            setPasswordAlert(''); // Clear password length alert if passwords don't match
        } else if (newPassword.length < 8) { // Check if new password is at least 8 characters
            setPasswordAlert('Password must be at least 8 characters');
            setAlertMessage(''); // Clear other alert if password length is invalid
        } else {
            setAlertMessage(''); // Clear the alert if everything is correct
            setPasswordAlert(''); // Clear password length alert if everything is correct

            try {
                const response = await fetch('http://localhost:5000/change-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify({ newPassword }),
                });

                if (response.ok) {
                    localStorage.setItem('signupPassword', newPassword); // Store the new password in local storage
                    navigate('/changepassword/success'); // Navigate to the change password update page
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
    }, [navigate]);

    // Function to handle 'Enter' key press event
    const handleKeyDown = useCallback((event) => {
        if (event.key === 'Enter') { // If 'Enter' is pressed
            handleChangePasswordUpdate(); // Trigger the password update
        }
    }, [handleChangePasswordUpdate]);

    return (
        <div className="ChangePassword-container"> {/* Main container */}
            <div className="ChangePassword-box"> {/* Box containing the password fields and buttons */}
                <img src={mangoLogo} alt="Mango Logo" className="ChangePassword-logo" onClick={handleFirstHomePage}/> {/* Logo image */}
                <h1>Change Password</h1> {/* Title */}
                {alertMessage && <div className="alert-message">{alertMessage}</div>} {/* Display alert message if exists */}
                <div className="changepassword-wrapper"> {/* Wrapper for new password input */}
                    <input
                        type={passwordVisibility.newPassword ? 'text' : 'password'} // Toggle between text and password input
                        ref={newPasswordRef}
                        placeholder="Enter your new password"
                        className="ChangePassword-input"
                        onKeyDown={handleKeyDown} // Handle keydown event for Enter key
                        maxLength="100" // Max length of password input
                    />
                    <button
                        type="button"
                        className="toggle-visibility"
                        onClick={() => toggleVisibility('newPassword')} // Toggle visibility for new password
                        aria-label={passwordVisibility.newPassword ? 'Hide password' : 'Show password'} // ARIA label for accessibility
                    >
                        <FontAwesomeIcon icon={passwordVisibility.newPassword ? faEyeSlash : faEye} /> {/* Toggle eye icon */}
                    </button>
                </div>
                <div className="changepassword-wrapper"> {/* Wrapper for confirm password input */}
                    <input
                        type={passwordVisibility.confirmPassword ? 'text' : 'password'} // Toggle between text and password input
                        ref={confirmPasswordRef}
                        placeholder="Confirm your new password"
                        className="ChangePassword-input"
                        onKeyDown={handleKeyDown} // Handle keydown event for Enter key
                        maxLength="100" // Max length of confirm password input
                    />
                    <button
                        type="button"
                        className="toggle-visibility"
                        onClick={() => toggleVisibility('confirmPassword')} // Toggle visibility for confirm password
                        aria-label={passwordVisibility.confirmPassword ? 'Hide password' : 'Show password'} // ARIA label for accessibility
                    >
                        <FontAwesomeIcon icon={passwordVisibility.confirmPassword ? faEyeSlash : faEye} /> {/* Toggle eye icon */}
                    </button>
                </div>
                {passwordAlert && <div className="password-alert">{passwordAlert}</div>} {/* Display password length alert */}

                <button onClick={handleChangePasswordUpdate} className="ChangePassword-button">
                    Change Password {/* Button to submit the password change */}
                </button>
            </div>
        </div>
    );
}

export default ChangePassword; // Export the ChangePassword component