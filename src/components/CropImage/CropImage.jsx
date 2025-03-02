import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import './CropImage.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { faHome, faCalculator, faChartBar, faExpand, faEraser, faInfoCircle, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const CropImage = () => {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    
      const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
      };

        const handleSignOut = useCallback(() => {
            
            // Navigate to sign-in page
            navigate('/logout');
        }, [navigate]);

    const handleAboutUs = useCallback(() => navigate('/aboutusmain'), [navigate]);
    const handleContactUs = useCallback(() => navigate('/contactusmain'), [navigate]);
    const handleUserProfile = useCallback(() => navigate('/profile'), [navigate]);
    const handleDashboard = useCallback(() => navigate('/dashboard'), [navigate]);
    const handleFeatureAnalysis = useCallback(() => navigate('/analysis'), [navigate]);
    const handleResize = useCallback(() => navigate('/resize'), [navigate]);
    const handleBruiseAreaCalculation = useCallback(() => navigate('/bruise'), [navigate]);
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleReset = () => {
        setImage(null);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
    };

    const handleSave = async () => {
        if (!image) {
            alert('Please upload an image first!');
            return;
        }

        if (!croppedAreaPixels) return;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.src = image;

        img.onload = () => {
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            ctx.drawImage(
                img,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                croppedAreaPixels.width,
                croppedAreaPixels.height
            );

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'cropped-image.png';
                a.click();
                URL.revokeObjectURL(url);
            }, 'image/png');
        };
    };

    return (
        <div className="bruiseareacalculation-page">
            <nav className="navbar">
                <div className="navbar-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="mango-logo" onClick={handlemainhomepage}/>
                </div>
                <div className="navbar-links">
                    <button className="navbar-link" onClick={handleDashboard}> <FontAwesomeIcon icon={faHome} /> Home</button>
                    <button className="navbar-link" onClick={handleResize}> <FontAwesomeIcon icon={faExpand} />Resize</button>
                    <button className="navbar-link" onClick={handleRemoveBackground}> <FontAwesomeIcon icon={faEraser} />Remove Background</button>
                    <button className="navbar-link" onClick={handleBruiseAreaCalculation}> <FontAwesomeIcon icon={faCalculator} />Bruised Area Calculation</button>
                    <button className="navbar-link" onClick={handleFeatureAnalysis}> <FontAwesomeIcon icon={faChartBar} />Feature Analysis</button>
                    <button className="navbar-link" onClick={handleAboutUs}> <FontAwesomeIcon icon={faInfoCircle} />About Us</button>
                    <button className="navbar-link" onClick={handleContactUs}> <FontAwesomeIcon icon={faEnvelope} />Contact Us</button>
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

            <div className="bruiseareacalculation-content">
                <h1 className="bruiseareacalculation-title">Crop Image</h1>
                <p className="bruise-description">
                    The online Crop image tool from mango bruise area detection transforms your images into the perfect size in seconds.
                </p>
                <div className="crop-image-container">
                    <div className="crop-image-upload">
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
                        <div className="image-crop">
                            <div className="crop-box">
                                <Cropper
                                    image={image}
                                    crop={crop}
                                    zoom={zoom}
                                    aspect={4 / 3}
                                    onCropChange={setCrop}
                                    onZoomChange={setZoom}
                                    onCropComplete={handleCropComplete}
                                />
                            </div>
                            <div className="crop-controls">
                                <div className="zoom-control">
                                    <FontAwesomeIcon icon={faSearchMinus} className="zoom-icon" />
                                    <input
                                        type="range"
                                        className="zoom-range"
                                        min="1"
                                        max="3"
                                        step="0.1"
                                        value={zoom}
                                        onChange={(e) => setZoom(e.target.value)}
                                    />
                                    <FontAwesomeIcon icon={faSearchPlus} className="zoom-icon" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="action-buttons">
                    <button className="bt backto-bt" onClick={handleReset}>
                        Reset
                    </button>
                    <button className="bt upload-bruiseareacalculation-bt" onClick={handleSave}>
                        Saved
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer-mainhomepage">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default CropImage;