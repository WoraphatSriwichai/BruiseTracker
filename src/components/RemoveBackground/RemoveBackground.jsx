import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './RemoveBackground.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

const RemoveBackground = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAboutUs = useCallback(() => navigate('/aboutus'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactus'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/analysis'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveBackground = () => {
        if (!image) {
            alert('Please upload an image first!');
            return;
        }

        setErrorMessage(''); // Clear any previous error messages

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];

                // Simple algorithm to make non-black pixels transparent
                if (r > 50 || g > 50 || b > 50) {
                    imageData.data[i + 3] = 0; // Set alpha to 0 (transparent)
                }
            }
            ctx.putImageData(imageData, 0, 0);

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                setProcessedImage(url);
            }, 'image/png');
        };
    };

    const handleDownloadImage = () => {
        if (processedImage) {
            const a = document.createElement('a');
            a.href = processedImage;
            a.download = 'processed-image.png';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const handleReset = () => {
        setImage(null);
        setProcessedImage(null);
        setErrorMessage('');
    };

    return (
        <div className="remove-background-page">
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage}/>
                </div>
                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}>Dashboard</button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}>Bruised Area Calculation</button>
                    <button className="navbar-link" onClick={handleFeatureAnalysis}>Feature Analysis</button>
                    <button className="navbar-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link" onClick={handleRemoveBackground}>Remove Background</button>
                    <button className="navbar-link" onClick={handleAboutUs}>About Us</button>
                    <button className="navbar-link" onClick={handleContactUs}>Contact Us</button>
                </div>
                <div className="navbar-profile" onClick={handleUserProfile}>
                    <img src={userProfileImg} alt="User Profile" className="user-profile" />
                </div>
            </nav>

            <div className="remove-background-content">
                <h1 className="remove-background-title">Remove Background</h1>
                <p className="remove-background-description">
                    Remove your background in just 5 seconds by simply uploading your image!
                </p>
                <div className="image-container">
                    <div className="image-upload">
                        <label htmlFor="imageInput" className="upload-label">Upload Image 📁</label>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            onChange={handleImageUpload}
                            hidden
                        />
                    </div>

                    {image && (
                        <div className="image-preview">
                            <img src={image} alt="Uploaded" className="uploaded-image" />
                        </div>
                    )}

                    {processedImage && (
                        <div className="image-preview">
                            <img src={processedImage} alt="Processed" className="processed-image" />
                        </div>
                    )}

                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </div>

                <div className="action-buttons">
                    <button className="btn reset-btn" onClick={handleReset}>
                        Reset
                    </button>
                    <button className="btn remove-btn" onClick={handleRemoveBackground}>
                        Remove
                    </button>
                    {processedImage && (
                    <button className="btn download-btn" onClick={handleDownloadImage}>
                        Download
                    </button>
                    )}
                </div>
            </div>

            <footer className="footer">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default RemoveBackground;