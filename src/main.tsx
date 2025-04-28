import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import {validateEnv} from "../configValidator.ts";
import "./presentation/styles/main.css";
import {AppRoutes} from "./presentation/routes/AppRoutes.tsx";
import {ThemeConfiguration} from "./presentation/Theme/ThemeConfiguration.tsx";

try {
    validateEnv()
} catch (e) {
    console.error(e)
}

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
                <ThemeConfiguration>
                    <AppRoutes/>
                </ThemeConfiguration>
        </BrowserRouter>
    </StrictMode>
)
