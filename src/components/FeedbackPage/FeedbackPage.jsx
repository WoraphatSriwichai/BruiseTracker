import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./FeedbackPage.css";

const FeedbackPage = () => {
    const [selectedEmotion, setSelectedEmotion] = useState(null);
    const [comment, setComment] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const emotions = [
        { id: "terrible", label: "Terrible", icon: "😵" },
        { id: "bad", label: "Bad", icon: "😞" },
        { id: "medium", label: "Medium", icon: "😐" },
        { id: "good", label: "Good", icon: "🙂" },
        { id: "excellent", label: "Excellent", icon: "😁" },
    ];

    const handleEmotionSelect = (id) => {setSelectedEmotion(id);};
    const handleCommentChange = (e) => {setComment(e.target.value);};
    const handleSubmit = () => {navigate('/feedbacksubmitted');};

    return (
        <div className="feedback-container">
            <div className="feedback-box">
                <h1>Session Feedback</h1>
                <div className="emotion-list">
                    {emotions.map((emotion) => (
                        <div
                            key={emotion.id}
                            className={`emotion-item ${selectedEmotion === emotion.id ? "selected" : ""}`}
                            onClick={() => handleEmotionSelect(emotion.id)}>
                            <span className="emotion-icon">{emotion.icon}</span>
                            <span className="emotion-label">{emotion.label}</span>
                        </div>
                    ))}
                </div>
                <textarea
                    className="feedback-comment"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={handleCommentChange}
                ></textarea>
                <button className="feedback-button" onClick={handleSubmit}>
                    Submit your feedback
                </button>
            </div>
        </div>
    );
};

export default FeedbackPage;

// ---------------------------------------------------------------------------------------------------------------------------------------
// Don't delete the feedback page, no matter what, because if you delete the feedback page, it will affect all the other pages of the code.
