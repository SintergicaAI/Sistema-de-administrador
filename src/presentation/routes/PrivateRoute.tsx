import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CheckAuthStatus } from '../../application/use-cases/CheckAuthStatus';
import { AuthApi } from '../../infrastructure/api/AuthApi';
import LoadingSpinner from '../components/common/LoadingSpinner.tsx';
import {GetNewTokenResponse} from "../../application/use-cases/GetNewToken.ts";

interface PrivateRouteProps {
  children: JSX.Element;
}

const authApi = new AuthApi();
const checkAuthStatus = new CheckAuthStatus(authApi);
const getNewToken = new GetNewTokenResponse(authApi);

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await checkAuthStatus.execute();
      setIsAuthenticated(auth);
    };

    //For every refresh, we get new refreshToken
    checkAuth().then(async () =>{
      await getNewToken.execute(authApi.getRefreshToken());
    });
  }, []);

  if (isAuthenticated === null) {
    return <LoadingSpinner />;
  }

  return isAuthenticated ? children : <Navigate to="auth" />;

};