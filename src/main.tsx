import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./presentation/pages/Home.tsx";
import {AuthLayout} from "./AuthLayout.tsx";
import Login from "./presentation/pages/Login.tsx";
import {ConfigProvider} from "antd";
import UserProfile from "./presentation/pages/UserProfile.tsx";
import ModelOverview from "./presentation/pages/ModelOverview.tsx";
import {KnowledgeOverview} from "./presentation/pages/knowledgeOverview.tsx";
import {ModelDetail} from "./presentation/pages/ModelDetail.tsx";
import {PrivateRoute} from "./presentation/routes/PrivateRoute.tsx";
import {validateEnv} from "../configValidator.ts";
import {Register} from "./presentation/pages/Register.tsx";
import {Administration} from './presentation/pages/Administration.tsx'
import "./styles/main.css";

try {
    validateEnv()
} catch (e) {
    console.error(e)
}

//TODO: Separar mis rutas de los estilos
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ConfigProvider wave={{disabled:true}} theme={
                {
                    token: {
                        borderRadius: 8,
                        colorSplit:'var(--c_slate_300)',
                        fontSizeHeading1:20,
                        fontFamily:'var(--base-font)'
                    },
                    // algorithm: theme.darkAlgorithm,
                    components: {
                        Layout: {
                            bodyBg:'var(--c_slate_100)',
                            headerBg:"inherit",
                            headerHeight:50,
                            siderBg: 'var(--c_slate_200)',
                            colorText:'var(--c_slate_500)',
                            algorithm: true
                        },
                        Button:{
                            colorPrimary:'var(--c_brand-500)',
                            colorPrimaryHover:'var(--c_brand_400)',
                            colorPrimaryActive:'var(--c_brand_600)',

                        },

                        List: {
                            colorFillAlter: '#123',
                            algorithm: true,
                        },
                        Menu: {
                            colorText: 'var(--c_slate_500)',
                            itemBg:'',
                            iconSize:24,
                            itemSelectedBg:'var(--c_brand_100)',
                            itemSelectedColor:'var(--c_brand-500)',
                            itemHoverColor:'var(--c_brand_500)',
                            itemHoverBg:'',
                            collapsedIconSize:24,
                            itemPaddingInline:1,
                            itemMarginInline:10,
                            /*itemMarginInline:9,
                            iconMarginInlineEnd:0,*/
                        },
                        "Divider": {
                            "margin": 0
                        },
                        Table: {
                            headerBg:'rgb(from var(--c_slate_100) r g b / 0.1)',
                            colorBgContainer:'rgb(from var(--c_slate_100) r g b / 0.1)',
                            headerColor:'var(--c_slate_500)',
                            fontWeightStrong:300,
                            rowHoverBg:'var(--c_slate_200)',
                        },
                        Avatar:{
                            colorTextLightSolid:'var(--c_brand-500)',
                            colorTextPlaceholder:'var(--c_brand_100)',
                            containerSize:32,
                            fontSize:12,
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
