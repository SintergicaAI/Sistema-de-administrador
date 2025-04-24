import {Layout} from "antd";
import {HeaderPages} from "../../components/common";
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {GroupContextProvider} from "../../context/Group/GroupProvider.tsx";
import './styles/ContentStyle.css';
import {HeaderGroupContent} from "../../components/Groups/HeaderGroupContent.tsx";

export const Groups = () => {
    return (
        <GroupContextProvider>
            <Layout style={{minHeight: '100vh'}}>
                <HeaderPages>
                    <HeaderGroupContent/>
                </HeaderPages>
                <Content>
                    <Outlet/>
                </Content>
            </Layout>
        </GroupContextProvider>
    );
}