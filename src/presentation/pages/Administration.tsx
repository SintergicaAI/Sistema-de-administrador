import {Flex, Layout} from "antd";
import {HeaderPages} from "../components/common/HeaderPages.tsx";
const {Content} = Layout
import {TableAdministration} from "../components/Administration/TableAdministration.tsx";
import {ButtonModal} from "../components/Administration/ButtonModal.tsx";
import {AdministrationContextProvider} from "../context/Administration/AdministrationProvider.tsx";
import {RenderSideBarTable} from "../components/Administration/RenderSideBarTable.tsx";
import {ConfigurationIcons} from "../components/Administration/ConfigurationIcons.tsx";

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
                        <Flex
                            justify='space-between'
                            style={HeaderButtonsStyle} align={"center"}>
                                <ButtonModal/>
                                <ConfigurationIcons/>
                        </Flex>
                        <TableAdministration/>
                    </Content>
                    <RenderSideBarTable/>
                </AdministrationContextProvider>
            </Layout>
        </Layout>
    );
}