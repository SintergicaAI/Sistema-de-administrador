import {Flex, Layout} from "antd";
import {HeaderPages} from "../components/common/HeaderPages.tsx";
const {Content} = Layout
import {TableAdministration} from "../components/Administration/TableAdministration.tsx";
import {ButtonModal} from "../components/Administration/ButtonModal.tsx";
import {AdministrationContextProvider} from "../context/Administration/AdministrationProvider.tsx";
import {RenderSideBarTable} from "../components/Administration/RenderSideBarTable.tsx";

export const Administration = ({texto}:{texto:string}) =>{



    /*useEffect(() => {
        setHasNotSelected(JSON.stringify(selectedRow) === '{}')
        console.log(selectedRow);
    }, [selectedRow]);*/

    return (
        <Layout style={{minHeight:'100vh'}}>
            <HeaderPages text={texto}/>
            <Layout>
                <AdministrationContextProvider>

                    <Content style={{paddingTop:12}}>
                        <Flex justify='flex-start' style={{marginInline:24}} >
                                <ButtonModal/>
                        </Flex>
                        <TableAdministration/>
                    </Content>

                {/*TODO:Cambiar logica de aparecer Sidebar*/}
                <RenderSideBarTable/>
                </AdministrationContextProvider>
            </Layout>
        </Layout>
    );
}