import {Layout} from "antd";
import {Outlet} from "react-router-dom";
import {SideMenuPrincipal} from "../../components/common/SideMenuPrincipal.tsx";

export const Home = () => {


    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideMenuPrincipal />
            <Layout>
                <Outlet/>
                </Layout>
            </Layout>
    );
}