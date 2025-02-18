import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component }: { element: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('accessToken'); // Check if the token is present

  return isAuthenticated ? Component : <Navigate to="/signin" />;
};

export default PrivateRoute;