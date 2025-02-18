/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useCallback } from 'react'; // Import React library for component creation
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './ChangePasswordUpdate.css'; // Import CSS for styling
import mangoLogo from '../../assets/check.png'; // Import logo image, update the path if necessary

function ChangePasswordUpdate() {
    const navigate = useNavigate(); // Initialize navigate for navigation to other pages

    // Function to handle sign-in button click and navigate to sign-in page
    const handleSignIn = useCallback(() => {
        navigate('/logout');
    }, [navigate]);

    return (
        <div className="ChangePasswordUpdate-container"> {/* Main container for the update page */}
            <div className="ChangePasswordUpdate-box"> {/* Box for the content */}
                <img src={mangoLogo} alt="Mango Logo" className="ChangePasswordUpdate-logo" /> {/* Logo image */}
                <h1>Password Updated</h1> {/* Title of the page */}
                <p>Your password has been updated</p> {/* Message indicating password update */}
                <button onClick={handleSignIn} className="Verify-button">Sign-in</button> {/* Sign-in button to navigate */}
            </div>
        </div>
    );
}

export default ChangePasswordUpdate; // Export ChangePasswordUpdate component for use in other parts of the app
