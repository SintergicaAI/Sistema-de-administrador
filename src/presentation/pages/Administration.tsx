import {Button, Flex, Layout} from "antd";
import {HeaderPages} from "../components/common/HeaderPages.tsx";
import { UserRoundPlus } from 'lucide-react';
const {Content} = Layout
import {useEffect, useState} from "react";
import {SidebarTableAdministration} from "../components/Administration/SidebarTableAdministration.tsx";
import {TableAdministration} from "../components/Administration/TableAdministration.tsx";

const styleIcon:React.CSSProperties = {
    width: '20px',
    height: '20px',

}




//TODO: Buscar la manera en la que solo se me seleccione un elemento
//TODO:Separar el componente tabla de
export const Administration = ({texto}:{texto:string}) =>{


    const [selectedRow,setSelectedRow]=useState({}) //Estado para controlar el elmento seleccionado
    const [hasNotSelected,setHasNotSelected ]=useState<boolean>(true)


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
                        <Button type="primary" icon={<UserRoundPlus style={styleIcon}/>}> Nuevo usuario</Button>
                    </Flex>

                    <TableAdministration setSelectedRow={setSelectedRow}/>
                </Content>

                {/*TODO:Pasar esta logicia a otro componente*/}
                {
                            !hasNotSelected &&
                            (<SidebarTableAdministration userSelected={selectedRow}
                                                         hasNotSelected={setHasNotSelected}
                            />)
                }
            </Layout>
        </Layout>
    );
}