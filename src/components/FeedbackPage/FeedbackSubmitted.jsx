/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FeedbackSubmitted.css';
import mangoLogo from '../../assets/check.png'; // Update the path if needed

function FeedbackSubmitted() {
    const navigate = useNavigate(); // Initialize navigate

    const handleFirstHomePage = () => {navigate('/firsthomepage');};

    return (
        <div className="FeedbackSubmitted-container">
            <div className="FeedbackSubmitted-box">
                <img src={mangoLogo} alt="Mango Logo" className="FeedbackSubmitted-logo" />
                <h1>Thank you for your feedback</h1>
                <button onClick={handleFirstHomePage} className="Verify-button">Done</button>
            </div>
        </div>
    );
}

export default FeedbackSubmitted;

// ---------------------------------------------------------------------------------------------------------------------------------------
// Don't delete the feedback page, no matter what, because if you delete the feedback page, it will affect all the other pages of the code.
