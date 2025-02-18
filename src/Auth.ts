import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      // Optionally, you can verify the token with the server here
      navigate('/mainhomepage'); // Redirect to the main homepage if the token exists
    }
  }, [navigate]);
};

const UnAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      // Redirect to the home page if the token does not exist
      navigate('/');
    }
  }, [navigate]);
};

export { useAuth, UnAuth };