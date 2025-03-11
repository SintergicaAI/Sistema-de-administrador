import {Flex, Layout} from "antd";
import {HeaderPages} from "../components/common/HeaderPages.tsx";
const {Content} = Layout
import {TableAdministration} from "../components/Administration/TableAdministration.tsx";
import {ButtonModalInviteUser} from "../components/Administration/ModalInviteUser/ButtonModalInviteUser.tsx";
import {AdministrationContextProvider} from "../context/Administration/AdministrationProvider.tsx";
import {RenderSideBarTable} from "../components/Administration/RenderSideBarTable.tsx";
import {ConfigurationIcons} from "../components/Administration/ConfigurationIcons.tsx";
import {FilterButtons} from "../components/Administration/FilterButtons.tsx";

const HeaderButtonsStyle:React.CSSProperties = {
    width: '90%',
    minWidth:'450px',
    maxWidth: '1024px',
    marginInline: 'auto',
    marginBlockEnd:'24px',
}

export const Administration = ({texto}:{texto:string}) =>{


    return (
        <Layout style={{minHeight:'100vh'}}>
            <HeaderPages text={texto}/>
            <Layout>
                <AdministrationContextProvider>

                    <Content style={{paddingTop:12}}>
                        <section style={HeaderButtonsStyle}>
                            <Flex
                                justify='space-between'
                                align={"center"}>
                                    <ButtonModalInviteUser/>
                                    <ConfigurationIcons/>
                            </Flex>
                            <FilterButtons/>
                        </section>
                        <TableAdministration/>
                    </Content>
                    <RenderSideBarTable/>
                </AdministrationContextProvider>
            </Layout>
        </Layout>
    );
}