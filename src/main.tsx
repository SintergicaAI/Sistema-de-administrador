import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import {validateEnv} from "../configValidator.ts";
import "./presentation/styles/main.css";
import {ThemeConfiguration} from "./presentation/Theme/ThemeConfiguration.tsx";
import {SistemaApp} from "./SistemaApp.tsx";

try {
    validateEnv()
} catch (e) {
    console.error(e)
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
                <ThemeConfiguration>
                  <SistemaApp/>
                </ThemeConfiguration>
        </BrowserRouter>
    </StrictMode>
)
