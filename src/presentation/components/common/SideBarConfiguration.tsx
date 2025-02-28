import {Layout} from 'antd'
import './styles/sidebarConfiguration.css'
const {Sider,Header,Content} = Layout
import { X } from 'lucide-react';
import {Dispatch, ReactNode, SetStateAction} from 'react';


export const SideBarConfiguration = ({childrenHeader, contentChildren, hasSelected}:
                                     {childrenHeader:ReactNode,contentChildren:ReactNode,
                                         hasSelected:Dispatch<SetStateAction<any>>})=>{


    const closeSideBar = () => {
        hasSelected(false);
        document.querySelector(".ant-table-row-selected")?.classList.remove("ant-table-row-selected");
    }

    return (
        <Sider className="sidebar-configuration" width="25%">
            <Layout>
                <Header style={{
                    display:'flex',
                    justifyContent:'space-between',
                    gap:10,
                    alignItems:'center',paddingInline:0}}
                >
                    {childrenHeader}
                    <X onClick={closeSideBar}/>
                </Header>
                <Content> {contentChildren}</Content>
            </Layout>
        </Sider>
    )
}