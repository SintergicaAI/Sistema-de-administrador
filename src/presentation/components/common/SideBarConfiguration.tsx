import {Layout} from 'antd'
import './styles/sidebarConfiguration.css'
const {Sider,Header,Content} = Layout
import { X } from 'lucide-react';
import {Dispatch, ReactNode, SetStateAction} from 'react';


export const SideBarConfiguration = ({childrenHeader, contentChildren, hasNotSelected}:
                                     {childrenHeader:ReactNode,contentChildren:ReactNode,
                                         hasNotSelected:Dispatch<SetStateAction<any>>})=>{

    const closeSideBar = () => {
        console.log('Me diste click');
        hasNotSelected(true);
    }

    return (
        <Sider className="sidebar-configuration" width="25%">
            <Layout>
                <Header style={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center',paddingInline:0}}
                >{childrenHeader} <X onClick={closeSideBar}/></Header>
                <Content> {contentChildren}</Content>
            </Layout>
        </Sider>
    )
}