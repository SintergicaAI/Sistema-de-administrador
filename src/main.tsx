import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route } from "react-router";
import App from './App.tsx'
import {Home} from "./Home.tsx";
import {AuthLayout} from "./AuthLayout.tsx";
import Login from "./Login.tsx";
import {ConfigProvider} from "antd";
import "./styles/main.css";
import {Register} from "./Register.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <ConfigProvider theme={{
              token: {
                  colorPrimary: "#006FFB",
                  colorTextHeading:'#35383C',
                  colorIcon:'#006FFB',
                    /*fontFamily:"Inter,sans-serif",*/
              }
          }}>

          <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home/>} />
              </Route>
              <Route element={<AuthLayout/>}>
                  <Route path="/login" element={<Login/>}/>
                  <Route path={'/register'} element={<Register/>}/>
              </Route>
          </Routes>
          </ConfigProvider>
      </BrowserRouter>
  </StrictMode>,
)
