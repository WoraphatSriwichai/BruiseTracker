import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return null; // No UI needed
}

export default LogoutPage;