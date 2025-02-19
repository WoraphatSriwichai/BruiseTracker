import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./ShowAreaCalculation.css";
import mangoLogo from "../../assets/Logo_white.png";
import userProfileImg from "../../assets/profile.jpg";

const ShowAreaCalculation = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  useEffect(() => {
    const storedFiles = localStorage.getItem('uploadedFiles');
    if (storedFiles) {
      setTableData(JSON.parse(storedFiles));
    }
  }, []);

  const handleDelete = useCallback((id) => {
    const updatedData = tableData.filter((row) => row.id !== id);
    setTableData(updatedData);
    localStorage.setItem('uploadedFiles', JSON.stringify(updatedData));
  }, [tableData]);

  const handleRemoveBackground = useCallback(() => navigate("/removebackground"), [navigate]);

  const handleAboutUs = useCallback(() => navigate("/aboutus"), [navigate]);
  const handleContactUs = useCallback(() => navigate("/contactus"), [navigate]);
  const handleUserProfile = useCallback(() => navigate("/profile"), [navigate]);
  const handleBack = useCallback(() => navigate("/bruise"), [navigate]);
  const handleResize = useCallback(() => navigate('/resize'), [navigate]);
  const handleDashboard = useCallback(() => navigate("/dashboard"), [navigate]);
  const handleBruiseAreaCalculation = useCallback(() => navigate("/bruise"), [navigate]);
  const handleFeatureAnalysis = useCallback(() => navigate("/analysis"), [navigate]);
  const handleViewPhotoResults = useCallback((index) => navigate("/viewphoto/result", { state: { index } }), [navigate]);
    const handlemainhomepage = useCallback(() => navigate('/home'), [navigate]);

  const handleExportCSV = useCallback(() => {
    if (tableData.length === 0) {
      alert("No information to export");
    } else {
      setIsExporting(true);
      const interval = setInterval(() => {
        setExportProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            navigate("/exportcsv");
            return 100;
          }
          return prevProgress + 10;
        });
      }, 300);
    }
  }, [tableData, navigate]);

  return (
    <div className="show-area-calculation-page">
      <nav className="navbar-showareacalculation">
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

      <div className="show-area-calculation-content">
        <h2 className="show-area-calculation-title">Bruise Area Calculation Results</h2>
        <div className="show-area-calculation-table-container">
          {tableData.length > 0 ? (
            <table className="show-area-calculation-table">
              <thead>
                <tr>
                  <th>Photo Name</th>
                  <th>Whole Fruit Area</th>
                  <th>Bruise Area</th>
                  <th>Bruise Area Percentage</th>
                  <th>Results</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={row.id}>
                    <td>{row.photoName}</td>
                    <td>{row.date}</td>
                    <td>{row.area}</td>
                    <td>{row.percentage}</td>
                    <td>
                      <button className="btn view-result-btn" onClick={() => handleViewPhotoResults(index)}>View Photo</button>
                    </td>
                    <td>
                      <button className="btn export-result-btn" onClick={() => handleDelete(row.id)}>Delete Photo</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-info-box">No information available</div>
          )}
        </div>

        <div className="area-action-buttons">
          <button className="btn backer-btn" onClick={handleBack}>Back</button>
          <button className="btn upload-btn" onClick={handleExportCSV}>Export CSV</button>
        </div>

        {isExporting && (
          <div className="export-progress">
            <p>Exporting CSV... {exportProgress}%</p>
          </div>
        )}
      </div>

      <footer className="footer-showareacalculation">
        <div className="footer-showareacalculation-address">
          <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
        </div>
      </footer>
    </div>
  );
};

export default ShowAreaCalculation;