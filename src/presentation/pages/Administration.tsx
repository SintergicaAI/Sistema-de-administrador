import {Button, Flex, Layout,Col,Row} from "antd";
import {HeaderPages} from "../components/common/HeaderPages.tsx";
import { UserRoundPlus } from 'lucide-react';
const {Content,Sider} = Layout
import type {TableProps} from 'antd';
import type {AdministrationApiResponse} from '../../infrastructure/api/types/TableApiResponse'
import {Avatar} from "../components/common/Avatar.tsx";
import {useEffect, useState} from "react";
import {SidebarTableAdministration} from "../components/Administration/SidebarTableAdministration.tsx";
import {TableAdministration} from "../components/Administration/TableAdministration.tsx";

const styleIcon:React.CSSProperties = {
    width: '20px',
    height: '20px',

}

interface DataType extends AdministrationApiResponse {
    key:string;
}

//TODO: Generar la logica para que la informacion se consiga de un endpoint
const data:DataType[] = [
    {
        key:'1',
        fullName:'Gonzalo',
        rol:'administrador',
        email:'gonzalo@gmail.com',
        groups:5
    },
    {
        key:'2',
        fullName:'Pedro',
        rol:'usuario',
        email:'gonzalo@gmail.com',
        groups:5
    },
    {
        key:'3',
        fullName:'Juan',
        rol:'usario',
        email:'gonzalo@gmail.com',
        groups:5
    }
]


const columns: TableProps<DataType>['columns'] = [
    {
        title:'Usuario',
        dataIndex: 'fullName',
        key: 'fullName',
        render: (name)=>(<Avatar name={name}/>)
    },
    {
        title:'Rol',
        key:'rol',
        dataIndex: 'rol',
    },
    {
        title:'Correo',
        key:'email',
        dataIndex: 'email',
    },
    {
        title:'Grupos',
        key:'groups',
        dataIndex: 'groups',
    }
]
const tableStyle:React.CSSProperties = {
    width: '90%',
    minWidth:'450px',
    maxWidth: '900px',
    marginInline: 'auto',
}

interface RecordType {
    key:string;
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
        <Layout style={{border:'1px solid red', minHeight:'100vh'}}>
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