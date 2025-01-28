import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter,Routes,Route } from "react-router";
import App from './App.tsx'
import Home from './Home.tsx';
import "./styles/main.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<App />}/>
              <Route path="/home" element={<Home />}/>
          </Routes>
      </BrowserRouter>
  </StrictMode>,
)
