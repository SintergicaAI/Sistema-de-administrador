import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./presentation/pages/Home.tsx";
import {AuthLayout} from "./AuthLayout.tsx";
import Login from "./presentation/pages/Login.tsx";
import {ConfigProvider} from "antd";
import "./styles/main.css";
import UserProfile from "./presentation/pages/UserProfile.tsx";
import ModelOverview from "./presentation/pages/ModelOverview.tsx";
import {KnowledgeOverview} from "./presentation/pages/knowledgeOverview.tsx";
import {ModelDetail} from "./presentation/pages/ModelDetail.tsx";
import {PrivateRoute} from "./presentation/routes/PrivateRoute.tsx";
import {validateEnv} from "../configValidator.ts";
import {Register} from "./Register.tsx";

try {
    validateEnv()
} catch (e) {
    console.error(e)
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ConfigProvider theme={
                {
                    token: {
                        colorPrimary: 'rgb(0, 69, 153)', // Púrpura
                        borderRadius: 8,
                    },
                    // algorithm: theme.darkAlgorithm,
                    components: {
                        Layout: {
                            headerBg: '#ffffff',
                            siderBg: '#ffffff',

                            algorithm: true
                        },
                        List: {
                            colorFillAlter: '#123',
                            algorithm: true,
                        }
                    },
                }}>

                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                    </Route>
                    <Route element={<PrivateRoute><Home/></PrivateRoute>}>
                        <Route index element={<UserProfile userId={"1"}/>}/>
                        <Route path="profile" element={<UserProfile userId={"1"}/>}/>
                    </Route>
                    <Route path="workspace" element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                    }>
                        <Route index element={<ModelOverview/>}/>
                        <Route path={"models"}>
                            <Route index element={
                                <ModelOverview/>
                            }/>
                            <Route path=":id" element={<ModelDetail/>}/>
                        </Route>
                        <Route path={"knowledge"} element={<KnowledgeOverview/>}/>
                    </Route>
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    </StrictMode>,
)
