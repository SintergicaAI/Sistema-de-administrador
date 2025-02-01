import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./Home.tsx";
import {AuthLayout} from "./AuthLayout.tsx";
import Login from "./Login.tsx";
import {ConfigProvider} from "antd";
import "./styles/main.css";
import UserProfile from "./presentation/pages/UserProfile.tsx";
import ModelOverview from "./presentation/pages/ModelOverview.tsx";
import {KnowledgeOverview} from "./presentation/pages/knowledgeOverview.tsx";
import {ModelDetail} from "./presentation/pages/ModelDetail.tsx";
import {PrivateRoute} from "./presentation/routes/PrivateRoute.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <ConfigProvider theme={{
              token: {
                  colorPrimary: '#673AB7', // Púrpura
                  colorInfo: '#2196F3',    // Azul
                  colorSuccess: '#4CAF50', // Verde
                  colorWarning: '#FF9800', // Naranja
                  colorError: '#F44336',   // Rojo

                  colorBgBase: '#FFFFFF',       // Fondo base
                  colorBgContainer: '#FAFAFA', // Fondo de contenedores
                  colorTextBase: '#212121',     // Texto principal
                  colorTextSecondary: '#757575',// Texto secundario
                  colorBorder: '#E0E0E0',       // Bordes
              }
          }}>

          <Routes>
              <Route element={<AuthLayout/>}>
                  <Route path="/login" element={<Login/>}/>
              </Route>
              <Route path="/" element={<Home />}>
                <Route index element={<UserProfile userId={"1"}/>} />
                  <Route path="/profile" element={<UserProfile userId={"1"}/>}/>
              </Route>
              <Route path="workspace" element={<Home/>}>
                  <Route index element={<ModelOverview />} />
                  <Route path={"models"}>
                      <Route index element={
                          <PrivateRoute>
                              <ModelOverview />
                          </PrivateRoute>
                          }/>
                      <Route path=":id" element={<ModelDetail />}/>
                  </Route>
                  <Route path={"knowledge"} element={<KnowledgeOverview />}/>
              </Route>
          </Routes>
          </ConfigProvider>
      </BrowserRouter>
  </StrictMode>,
)
