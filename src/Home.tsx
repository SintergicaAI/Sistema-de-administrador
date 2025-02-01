import { Layout,Menu,theme } from "antd";
import {MenuProps} from "antd";
import {useState} from "react";
import { WechatWorkOutlined,UserOutlined, CodeFilled} from "@ant-design/icons";
import {Outlet} from "react-router-dom";
import { useNavigate} from "react-router";
const {Content,Footer,Sider} = Layout;

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
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Information', '/profile'),
    ]),
    getItem('Workspace', '/workspace', <CodeFilled />,
        [
            getItem('Knowledge', '/workspace/knowledge'),
            getItem('Models', '/workspace/models'),
        ]),
    getItem('Knowledge', '/knowledge', <WechatWorkOutlined />),
];



export const Home =  () =>{
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleMenuClick = (e: any) => {
        navigate(e.key);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" onClick={handleMenuClick} defaultSelectedKeys={['1']} mode="inline" items={items } />
            </Sider>
            <Layout>
                {/*<Header style={{ padding: 0, background: colorBgContainer }} />*/}
                <Content style={{ margin: '50px 16px' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: "100%",
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', padding:"1rem" }}>
                    Sintergica ©{new Date().getFullYear()} Created by Gonzalo Perez
                </Footer>
            </Layout>
        </Layout>
    );
}