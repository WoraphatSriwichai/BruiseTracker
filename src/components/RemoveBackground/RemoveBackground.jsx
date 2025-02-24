import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RemoveBackground.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';

const RemoveBackground = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [processedImage, setProcessedImage] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
            
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const handleSignOut = useCallback(() => {
        // Clear authentication tokens
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        
        // Navigate to sign-in page
        navigate('/signin');
    }, [navigate]);

    const handleAboutUs = useCallback(() => navigate('/aboutusmain'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactusmain'), [navigate]);
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

    const handleRemoveBackground = async () => {
        if (!image) {
            alert('Please upload an image first!');
            return;
        }

        setErrorMessage(''); // Clear any previous error messages

        try {
            const formData = new FormData();
            formData.append('image', dataURLtoFile(image, 'uploaded-image.png'));

            const response = await axios.post('http://localhost:4000/remove_background', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                responseType: 'blob',
            });

            const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
            setProcessedImage(imageUrl);
        } catch (error) {
            console.error('Error removing background:', error);
            setErrorMessage('Failed to remove background. Please try again.');
        }
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

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
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

                <div className="navbar-profile">
                    <img src={userProfileImg} alt="User Profile" className="user-profile" onClick={toggleProfileDropdown} />
                    {isProfileDropdownOpen && (
                    <div className="profile-dropdown">
                        <button className="dropdown-link" onClick={handleUserProfile}>View Profile</button>
                        <button className="dropdown-link" onClick={handleSignOut}>Sign Out</button>
                    </div>
                    )}
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
                            <h3>Original Image</h3>
                            <img src={image} alt="Uploaded" className="uploaded-image" />
                        </div>
                    )}

                    {processedImage && (
                        <div className="image-preview">
                            <h3>Processed Image</h3>
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