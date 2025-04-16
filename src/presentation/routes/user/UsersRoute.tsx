import {Route, Routes} from "react-router";
import {Register} from "../../pages/auth/Register.tsx";
import {RegisterLayout} from "../../Layout/RegisterLayout.tsx";
import {ConfigProvider} from "antd";

export const UsersRoute = ()=>{
    return (<Routes>

        <Route path='register' element={
                <RegisterLayout>
                    <ConfigProvider theme={{
                        "components": {
                            "Form": {
                                "labelColor": "rgb(100,116,139)"
                            }
                        }
                    }}>
                        <Register/>
                    </ConfigProvider>
                </RegisterLayout>
        } />
    </Routes>)
};