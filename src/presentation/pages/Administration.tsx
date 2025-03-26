import {Flex, Layout} from "antd";
import {HeaderPages} from "../components/common";
const {Content} = Layout
import {ButtonModalInviteUser} from "../components/Administration/ModalInviteUser/ButtonModalInviteUser.tsx";
import {AdministrationContextProvider} from "../context/Administration";
import {RenderSideBarTable} from "../components/Administration/RenderSideBarTable.tsx";
import {ConfigurationIcons} from "../components/Administration/ConfigurationIcons.tsx";
import {FilterButtons} from "../components/Administration/FilterButtons.tsx";
import {Tables} from "../components/Administration/Tables.tsx";

const ContentStyle:React.CSSProperties = {
    width: '90%',
    minWidth:'450px',
    maxWidth: '1024px',
    marginInline: 'auto',
    marginBlockEnd:'24px',
    paddingTop:12,
    paddingInline:10
}

export const Administration = ({texto}:{texto:string}) =>{


    return (
        <Layout style={{minHeight:'100vh'}}>
            <HeaderPages text={texto}/>
            <Layout>
                <AdministrationContextProvider>

                    <Content style={ContentStyle}>
                        <section>
                            <Flex
                                justify='space-between'
                                align={"center"}>
                                    <ButtonModalInviteUser/>
                                    <ConfigurationIcons/>
                            </Flex>
                            <FilterButtons/>
                        </section>
                        <Tables/>
                    </Content>
                    <RenderSideBarTable/>
                </AdministrationContextProvider>
            </Layout>
        </Layout>
    )
}