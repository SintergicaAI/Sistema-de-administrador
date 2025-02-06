import {Avatar, Flex, Layout, Menu, MenuProps, message, theme} from "antd";
import React, {useState} from "react";
import {CodeFilled, UserOutlined, WechatWorkOutlined} from "@ant-design/icons";
import {Outlet} from "react-router-dom";
import {To, useNavigate} from "react-router";
import {Header} from "antd/es/layout/layout";
import {AuthApi} from "../../infrastructure/api/AuthApi.ts";
import {LogOut} from "../../application/use-cases/LogOut.ts";

const {Content, Footer, Sider} = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('User', 'sub1', <UserOutlined/>, [
        getItem('Information', '/profile'),
    ]),
    getItem('Workspace', '/workspace', <CodeFilled/>,
        [
            getItem('Knowledge', '/workspace/knowledge'),
            getItem('Models', '/workspace/models'),
        ]),
    getItem('Knowledge', '/knowledge', <WechatWorkOutlined/>),
];

const url = "https://avatars.githubusercontent.com/u/85546178?v=4";

export const Home = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const handleMenuClick = (e: { key: To; }) => {
        navigate(e.key);
    }

    const handleLogOut = () => {
        const api = new AuthApi()
        const logout = new LogOut(api)

        logout.execute().then(() => {
            message.open({
                type: 'loading',
                content: 'Cerrando sesión',
                duration: 3,
            }).then(()=> navigate("/login"))
        }).catch(error => {
            message.open({
                type: 'error',
                content: 'No se pudo cerrar sesión. Error: ' + error.message,
                duration: 3,
            })
        })
    }
    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Flex justify="center" align="center">
                    <Avatar src={<img src={url} alt={"github avatar"}/>}></Avatar>
                </Flex>

                <Menu onClick={handleMenuClick} defaultSelectedKeys={['1']} mode="inline" items={items}/>
                <button onClick={() => (handleLogOut())}>Logout</button>
            </Sider>

            <Layout>
                <Header />
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
                </Footer>
            </Layout>
        </Layout>
    );
}