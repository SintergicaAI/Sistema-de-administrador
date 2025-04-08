import {Route, Routes} from "react-router";
import Login from "../../pages/auth/Login.tsx";
import {Register} from "../../pages/auth/Register.tsx";
import {AuthLayout} from "../../Layout/AuthLayout.tsx";

export const AuthRoutes = () =>{
    return (<Routes >
                <Route element={<AuthLayout/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route path="invitation/:token"/>

                </Route>
            </Routes>)
}