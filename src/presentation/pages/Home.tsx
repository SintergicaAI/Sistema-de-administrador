import {Layout, theme} from "antd";
import {Outlet} from "react-router-dom";
import {SideMenuPrincipal} from "../components/Home/SideMenuPrincipal.tsx";

export const Home = () => {


    /*
    Uso de variables establecidad en ConfigProvider
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();
*/

    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideMenuPrincipal />

            <Layout>
                    {/*<Header />
                    <Content style={{margin: '50px 16px'}}>
                        <div
                            style={{
                                padding: 24,
                                minHeight: "100%",
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center', padding: "1rem"}}>
                        Sintergica ©{new Date().getFullYear()} Created by Gonzalo Perez
                    </Footer>*/}
                <Outlet/>
                </Layout>
            </Layout>
    );
}