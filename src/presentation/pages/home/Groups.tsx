import {Layout} from "antd";
import {HeaderPages} from "../../components/common";
import {Content} from "antd/es/layout/layout";
import {Outlet} from "react-router-dom";
import {GroupContextProvider} from "../../context/Group/GroupProvider.tsx";
import './styles/ContentStyle.css';

export const Groups = () => {
    return (
        <GroupContextProvider>
            <Layout style={{minHeight: '100vh'}}>
                <HeaderPages text={"Grupos"}/>
                <Content className='container-content'>
                    <Outlet/>
                </Content>
            </Layout>
        </GroupContextProvider>
    );
}