import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const saveLogoutAction = async () => {
      try {
        await fetch('http://localhost:5000/user/action', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          },
          body: JSON.stringify({ operationType: 'Logout' })
        });
      } catch (err) {
        console.error('Error saving logout action:', err);
      }
    };

    saveLogoutAction();

    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return null; // No UI needed
}

export default LogoutPage;