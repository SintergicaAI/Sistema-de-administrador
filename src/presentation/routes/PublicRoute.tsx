import {CheckAuthStatus} from "../../application/use-cases/CheckAuthStatus.ts";
import {AuthApi} from "../../infrastructure/api/AuthApi.ts";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const authApi = new AuthApi();
const checkAuthStatus = new CheckAuthStatus(authApi);

interface PublicRouteProps {
    children: JSX.Element;
}

export const PublicRoute:React.FC<PublicRouteProps> = ({children}) => {
     const [isAuthenticated, setAuthenticated] = useState(false);


    const authenticated = async () =>{
        const response = await checkAuthStatus.execute();
        setAuthenticated(response);
    }

    useEffect(() => {
        authenticated();
    }, []);

    return isAuthenticated ? <Navigate to={"/"}/> : children;
}