import {Route, Routes, useSearchParams} from "react-router";
import {Register} from "../../pages/auth/Register.tsx";
import {RegisterLayout} from "../../Layout/RegisterLayout.tsx";
import {ConfigProvider, message} from "antd";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";
import {VerifySigInToken} from "../../../application/use-cases/VerifySigInToken.ts";
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import LoadingSpinner from "../../components/common/LoadingSpinner.tsx";

const authApi = new AuthApi();
const verifyToken = new VerifySigInToken(authApi);

export const UsersRoute = ()=>{

    const [messageApi,contextHolder] = message.useMessage();
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const [params] = useSearchParams();

     const checkAuthStatus = ()=>{
        /*const token = params.get("signInToken") ?? "";
         verifyToken.execute("gonzalo.anuar13@outlook.com",token).then( ()=>{
                console.log("sigInToken", token);
                setIsValidToken(true)
            }
        ).catch((error)=>{
            messageApi.open({type:'error',content:error.message});
             setTimeout(()=>{
                 setIsValidToken(false)
                 messageApi.destroy();
             },1000)
         })*/
         setIsValidToken(true);
    }

    useEffect(() => {
        checkAuthStatus();
    }, []);

    if (isValidToken === null) {
        return <LoadingSpinner />;
    }

    return isValidToken ? (
        <Routes>
        <Route path='register' element={
                <RegisterLayout>
                    {contextHolder}
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
        </Routes>
    ): <Navigate to={'/auth'}/>
};