import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CheckAuthStatus } from '../../application/use-cases/CheckAuthStatus';
import { AuthApi } from '../../infrastructure/api/AuthApi';
import LoadingSpinner from '../components/LoadingSpinner';

interface PrivateRouteProps {
  children: JSX.Element;
}

// Inyección manual de dependencias (puedes usar un contenedor como inversify si prefieres)
const authApi = new AuthApi();
const checkAuthStatus = new CheckAuthStatus(authApi);

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await checkAuthStatus.execute();
      setIsAuthenticated(auth);
    };

    checkAuth().then(r => console.log(r));
  }, []);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};