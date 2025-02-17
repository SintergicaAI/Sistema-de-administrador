import {Flex, Layout} from "antd";
import {HeaderPages} from "../components/common/HeaderPages.tsx";
const {Content} = Layout
import {useEffect, useState} from "react";
import {SidebarTableAdministration} from "../components/Administration/SidebarTableAdministration.tsx";
import {TableAdministration} from "../components/Administration/TableAdministration.tsx";
import {ButtonModal} from "../components/Administration/ButtonModal.tsx";
import {userSelected} from "../components/Administration/AdministrationTypes.ts";

export const Administration = ({texto}:{texto:string}) =>{


    const [selectedRow,setSelectedRow]=useState({}) //Estado para controlar el elmento seleccionado
    const [hasNotSelected,setHasNotSelected ]=useState<boolean>(true)

    /*TODO:Cambiar la forma en como aparece el SideBar*/
    useEffect(() => {
        setHasNotSelected(JSON.stringify(selectedRow) === '{}')
        console.log(selectedRow);
    }, [selectedRow]);

    return (
        <Layout style={{minHeight:'100vh'}}>
            <HeaderPages text={texto}/>
            <Layout>
                <Content style={{paddingTop:12}}>
                    <Flex justify='flex-start' style={{marginInline:24}} >
                            <ButtonModal/>
                    </Flex>

                    <TableAdministration setSelectedRow={setSelectedRow}/>
                </Content>

                {/*TODO:Cambiar logica de aparecer Sidebar*/}
                {
                            !hasNotSelected &&
                            (<SidebarTableAdministration userSelected={selectedRow as userSelected}
                                                         hasNotSelected={setHasNotSelected}
                            />)
                }
            </Layout>
        </Layout>
    );
}