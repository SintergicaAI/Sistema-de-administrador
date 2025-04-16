import {Outlet} from "react-router-dom";
import "../pages/auth/styles/auth.css";
import {ConfigProvider} from "antd";

export const AuthLayout = () =>{
    return (

            <ConfigProvider theme={{
                "components": {
                    "Form": {
                        "labelColor": "rgb(100,116,139)"
                    }
                }
            }}>
                <Outlet/>
            </ConfigProvider>
    );
}