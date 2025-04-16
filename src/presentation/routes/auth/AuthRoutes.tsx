import {Route, Routes} from "react-router";
import Login from "../../pages/auth/Login.tsx";
import {Register} from "../../pages/auth/Register.tsx";
import {AuthLayout} from "../../Layout/AuthLayout.tsx";
import {LoginLayout} from "../../Layout/LoginLayout.tsx";
import {RegisterLayout} from "../../Layout/RegisterLayout.tsx";
import {ChangePasswordLayout} from "../../Layout/ChangePasswordLayout.tsx";
import {ForgotPassword} from "../../pages/auth/ForgotPassword.tsx";

export const AuthRoutes = () =>{
    return (

        <Routes >
                <Route element={<AuthLayout/>}>
                    <Route index element={
                        <LoginLayout children={<Login/>}/>
                    }/>
                    <Route path="register" element={
                        <RegisterLayout>
                            <Register/>
                        </RegisterLayout>
                    }/>

                    <Route path="forgot-password" element={
                        <ChangePasswordLayout>
                            <ForgotPassword/>
                        </ChangePasswordLayout>} />

                </Route>
            </Routes>)
}