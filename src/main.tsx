import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route } from "react-router";
import App from './App.tsx'
import {Home} from "./Home.tsx";
import {AuthLayout} from "./AuthLayout.tsx";
import Login from "./Login.tsx";
import {ConfigProvider} from "antd";
import "./styles/main.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <ConfigProvider theme={{
              token: {
                  colorPrimary: "#01FAF5",
                    /*fontFamily:"Inter,sans-serif",*/
              }
          }}>

          <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home/>} />
              </Route>
              <Route element={<AuthLayout/>}>
                  <Route path="/login" element={<Login/>}/>
              </Route>
          </Routes>
          </ConfigProvider>
      </BrowserRouter>
  </StrictMode>,
)
