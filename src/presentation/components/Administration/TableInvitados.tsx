import {Flex, Table} from "antd";
import type { TableProps } from 'antd';
import {Avatar} from "../common";
import {useEffect, useState} from "react";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetInvitedUsers} from "../../../application/use-cases/GetInvitedUsers.ts";

interface DataType {
    key: string;
    usuario:string;
    email: string;
    grupos: null;
    active:boolean;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Usuario',
        dataIndex: 'usuario',
        key: 'usuario',
        render: (name) => (
            <Flex align="center" gap="var(--sm-space)">
                <Avatar name={name} type={"invitate"}/>
            </Flex>
        )
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Grupos',
        dataIndex: 'grupos',
        key: 'grupos',
    },
    {
        title: 'Active',
        dataIndex: 'active',
        key: 'active',
        render:(active:boolean) => (
            active ? <p>Activa</p>: <p>Inactivo</p>
        )
    },
]

/*const data: DataType[] = [
    {
        key: '1',
        usuario:"Pendiente",
        rol: 'Usuario',
        email:"gonzalo@gmail.com",
        grupos:"pendiente"
    },
    {
        key: '2',
        usuario:"Pendiente",
        rol: 'Usuario',
        email:"juan@gmail.com",
        grupos:"pendiente"
    },
]*/

const companyApi = new CompanyApi();
const getInvitedUsers = new GetInvitedUsers(companyApi);

export const TableInvitados = () => {
    const [data, setData] = useState<DataType[]>([]);

    const prepareData = () =>{
        getInvitedUsers.execute().then(res => {

        })
    }

    useEffect(() => {
        prepareData();
    }, []);

    return (<Table columns={columns} dataSource={data}/>)
}