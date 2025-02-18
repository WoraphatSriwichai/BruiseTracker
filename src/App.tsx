import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './UserContext';
import FirstHomePage from './components/FirstHomePage/FirstHomePage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import SignInPage from './components/SignInPage/SignInPage';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import Verify from './components/Verify/Verify';
import ChangePassword from './components/ChangePassword/ChangePassword';
import ChangePasswordUpdate from './components/ChangePasswordUpdate/ChangePasswordUpdate';
import MainHomePage from './components/MainHomePage/MainHomePage';
import AboutUsPage from './components/AboutUsPage/AboutUsPage';
import ContactUsPage from './components/ContactUsPage/ContactUsPage';
import FeedbackPage from './components/FeedbackPage/FeedbackPage';
import FeedbackSubmitted from './components/FeedbackPage/FeedbackSubmitted';
import DashboardPage from './components/DashboardPage/DashboardPage';
import UserProfilePage from './components/UserProfilePage/UserProfilePage';
import EditUserProfile from './components/EditUserProfile/EditUserProfile';
import ChangeProfilePassword from './components/ChangeProfilePassword/ChangeProfilePassword';
import NewPasswordUpdate from './components/NewPasswordUpdate/NewPasswordUpdate';
import BruiseAreaCalculation from './components/BruiseAreaCalculation/BruiseAreaCalculation';
import ShowAreaCalculation from './components/ShowAreaCalculation/ShowAreaCalculation';
import ExportCSVSuccessfully from './components/ExportCSVSuccessfully/ExportCSVSuccessfully';
import FeatureAnalysis from './components/FeatureAnalysisPage/FeatureAnalysis';
import ViewPhotoResults from './components/ViewPhotoResults/ViewPhotoResults';
import FeatureAnalysisResults from './components/FeatureAnalysisResults/FeatureAnalysisResults';
import ExportFeatureSuccessful from './components/ExportFeatureSuccessful/ExportFeatureSuccessful';
import Resize from './components/ResizePage/Resize';
import CropImage from './components/CropImage/CropImage';
import RemoveBackground from './components/RemoveBackground/RemoveBackground';
import TestTokenPage from './components/Token/tokentest';
import LogoutPage from './components/Logout/logout';
import PrivateRoute from './AuthRoute';

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/firsthomepage" />} />
          <Route path="/firsthomepage" element={<FirstHomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/changepasswordupdate" element={<ChangePasswordUpdate />} />
          <Route path="/mainhomepage" element={<PrivateRoute element={<MainHomePage />} />} />
          <Route path="/aboutuspage" element={<AboutUsPage />} />
          <Route path="/contactuspage" element={<ContactUsPage />} />
          <Route path="/feedbackpage" element={<FeedbackPage />} />
          <Route path="/feedbacksubmitted" element={<FeedbackSubmitted />} />
          <Route path="/dashboardpage" element={<PrivateRoute element={<DashboardPage />} />} />
          <Route path="/userprofilepage" element={<PrivateRoute element={<UserProfilePage />} />} />
          <Route path="/edituserprofile" element={<PrivateRoute element={<EditUserProfile />} />} />
          <Route path="/changeprofilepassword" element={<PrivateRoute element={<ChangeProfilePassword />} />} />
          <Route path="/newpasswordupdate" element={<PrivateRoute element={<NewPasswordUpdate />} />} />
          <Route path="/bruiseareacalculation" element={<PrivateRoute element={<BruiseAreaCalculation />} />} />
          <Route path="/showareacalculation" element={<PrivateRoute element={<ShowAreaCalculation />} />} />
          <Route path="/exportcsvsuccessfully" element={<PrivateRoute element={<ExportCSVSuccessfully />} />} />
          <Route path="/featureanalysis" element={<PrivateRoute element={<FeatureAnalysis />} />} />
          <Route path="/viewphotoresults" element={<PrivateRoute element={<ViewPhotoResults />} />} />
          <Route path="/featureanalysisresults" element={<PrivateRoute element={<FeatureAnalysisResults />} />} />
          <Route path="/exportfeaturesuccessful" element={<PrivateRoute element={<ExportFeatureSuccessful />} />} />
          <Route path="/resize" element={<PrivateRoute element={<Resize />} />} />
          <Route path="/cropimage" element={<PrivateRoute element={<CropImage />} />} />
          <Route path="/removebackground" element={<PrivateRoute element={<RemoveBackground />} />} />
          <Route path="/testtoken" element={<TestTokenPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;