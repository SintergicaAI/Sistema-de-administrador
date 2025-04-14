import {Route, Routes} from "react-router";
import {PublicRoute} from "./PublicRoute.tsx";
import {PrivateRoute} from "./PrivateRoute.tsx";
import {AuthRoutes} from "./auth/AuthRoutes.tsx";
import { HomeRoutes } from "./Home/HomeRoutes.tsx";
import {UsersRoute} from "./user/UsersRoute.tsx";


export const AppRoutes = () =>{
    return (<Routes>
                <Route path="auth/*" element={
                    <PublicRoute>
                        <AuthRoutes/>
                    </PublicRoute>
                }/>

        <Route path="users/*" element={
            <PublicRoute>
                <UsersRoute/>
            </PublicRoute>}/>

        <Route path="/*" element={
            <PrivateRoute>
                <HomeRoutes/>
            </PrivateRoute>}/>
    </Routes>)
}