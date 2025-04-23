import {Flex, Layout} from "antd";
import {HeaderPages} from "../../components/common";
const {Content} = Layout
import {ButtonModalInviteUser} from "../../components/Administration/ModalInviteUser/ButtonModalInviteUser.tsx";
import {AdministrationContextProvider} from "../../context/Administration";
import {RenderSideBarTable} from "../../components/Administration/RenderSideBarTable.tsx";
import {ConfigurationIcons} from "../../components/Administration/ConfigurationIcons.tsx";
import {FilterButtons} from "../../components/Administration/FilterButtons.tsx";
import {Tables} from "../../components/Administration/Tables.tsx";
import './styles/ContentStyle.css';

const space = 24;

export const Administration = ({texto}:{texto:string}) =>{


    return (
        <Layout style={{minHeight:'100vh'}}>
            <HeaderPages text={texto}/>
            <Layout style={{display:"flex",flexDirection:"row"}}>
                <AdministrationContextProvider>

                    <Content className='container-content'>
                        <section style={{marginBottom:space}}>
                            <Flex
                                style={{marginBottom:space}}
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