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
import {Administration} from './presentation/pages/Administration.tsx'

try {
    validateEnv()
} catch (e) {
    console.error(e)
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ConfigProvider wave={{disabled:true}} theme={
                {
                    token: {
                        borderRadius: 8,
                        colorSplit:'#CBD5E1',
                        fontSizeHeading1:20,
                    },
                    // algorithm: theme.darkAlgorithm,
                    components: {
                        Layout: {
                            bodyBg:'#F1F5F9',
                            headerBg:"#F1F5F9",
                            headerHeight:50,
                            siderBg: '#E2E8F0',
                            colorText: '#64748B',
                            algorithm: true
                        },
                        Button:{
                            colorPrimary:'#006EFA',
                            colorPrimaryHover:'#3092F7',
                            colorPrimaryActive:'#005ACD',

                        },

                        List: {
                            colorFillAlter: '#123',
                            algorithm: true,
                        },
                        Menu: {
                            colorText: '#64748B',
                            itemBg:'',
                            iconSize:24,
                            itemSelectedBg:'#B4E0F7',
                            itemSelectedColor:'#006EFA',
                            itemHoverColor:'#006EFA',
                            itemHoverBg:'',
                            collapsedIconSize:30,
                            itemMarginInline:9,
                            iconMarginInlineEnd:0,
                        },
                        "Divider": {
                            "margin": 0
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
                    <Route path='administration'
                           element={
                        <PrivateRoute>
                            <Home/>
                        </PrivateRoute>
                            }>
                            <Route index element={<Administration texto="Mi equipo"/>}/>
                    </Route>
                </Routes>
            </ConfigProvider>
        </BrowserRouter>
    </StrictMode>,
)
