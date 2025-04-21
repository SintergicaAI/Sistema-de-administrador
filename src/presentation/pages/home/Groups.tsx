import {Layout} from "antd";
import {HeaderPages} from "../../components/common";
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";

export const Groups = () => {
    return (
        <Layout style={{minHeight:'100vh'}}>
            <HeaderPages text={"Grupos"}/>
            <Content>
                <Outlet/>
            </Content>
        </Layout>
    )
}