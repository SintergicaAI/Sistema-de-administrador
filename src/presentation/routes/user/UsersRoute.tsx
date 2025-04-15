import {Route, Routes, useSearchParams} from "react-router";
import {Register} from "../../pages/auth/Register.tsx";
import {RegisterLayout} from "../../Layout/RegisterLayout.tsx";
import {ConfigProvider} from "antd";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";
import {VerifySigInToken} from "../../../application/use-cases/VerifySigInToken.ts";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";

const authApi = new AuthApi();
const verifyToken = new VerifySigInToken(authApi);
export const UsersRoute = ()=>{

    const [isValidToken, setIsValidToken] = useState(false);
    const [params] = useSearchParams();

     const checkAuthStatus = ()=>{
        const token = params.get("signInToken") ?? "";
         verifyToken.execute("",token).then( ()=>{
                setIsValidToken(true)
            }
        )
    }

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return isValidToken ? (<Routes>
        <Route path='register' element={
                <RegisterLayout>
                    <ConfigProvider theme={{
                        "components": {
                            "Form": {
                                "labelColor": "rgb(100,116,139)"
                            }
                        }
                    }}>
                        <Register/>
                    </ConfigProvider>
                </RegisterLayout>
        } />
    </Routes>) : <Navigate to='auth'/>;
};