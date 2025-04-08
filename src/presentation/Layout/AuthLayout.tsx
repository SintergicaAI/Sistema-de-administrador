import {Outlet} from "react-router-dom";
import "../pages/styles/login.css";
import {ConfigProvider} from "antd";

export const AuthLayout = () =>{
    return (
        <div
             style={{
                 backgroundColor: "var(--c_slate_200)",
                 minHeight: "100vh",
                padding: "0.5rem",}}>
            <ConfigProvider theme={{
                "components": {
                    "Form": {
                        "labelColor": "rgb(100,116,139)"
                    }
                }
            }}>

                <Outlet/>
            </ConfigProvider>
        </div>
    );
}