import { Layout,Menu,theme } from "antd";
import {MenuProps} from "antd";
import {useState} from "react";
import { FileOutlined,TeamOutlined,UserOutlined} from "@ant-design/icons";
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
    getItem('Username', 'sub1', <UserOutlined />, [
        getItem('Information', '3'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

export const Home =  () =>{

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
                        Bill is a cat.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center', padding:"1rem" }}>
                    Sintergica ©{new Date().getFullYear()} Created by Gonzalo Perez
                </Footer>
            </Layout>
        </Layout>
    );
}