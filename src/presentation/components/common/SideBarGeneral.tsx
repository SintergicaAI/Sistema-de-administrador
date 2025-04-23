import {Layout} from 'antd'
const {Sider,Header,Content} = Layout
import { X } from 'lucide-react';
import {Dispatch, ReactNode, SetStateAction} from 'react';

const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    backgroundColor:'var(--c_slate_50)',
    borderInlineStart:  '1px solid var(--c_slate_300)',
    height: '100vh',
    position: 'sticky',
    insetInlineEnd: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
};

export const SideBarGeneral = ({childrenHeader, contentChildren, hasSelected}:
                                     {childrenHeader:ReactNode,contentChildren:ReactNode,
                                         hasSelected:Dispatch<SetStateAction<any>>})=>{


    const closeSideBar = () => {
        hasSelected(false);
        document.querySelector(".ant-table-row-selected")?.classList.remove("ant-table-row-selected");
    }

    return (
        <Sider width="30%" style={siderStyle}>
            <Layout style={{backgroundColor:'var(--c_slate_50)',paddingInline:'var(--lg-space)', paddingBlock:'var(--xl-space)'}}>
                <Header style={{
                    display:'flex',
                    justifyContent:'space-between',
                    gap:10,
                    alignItems:'center',paddingInline:0}}
                >
                    {childrenHeader}
                    <X style={{cursor:'pointer'}} onClick={closeSideBar}/>
                </Header>
                <Content> {contentChildren}</Content>
            </Layout>
        </Sider>
    )
}