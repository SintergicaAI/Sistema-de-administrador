import {Flex, Table} from "antd";
import type { TableProps } from 'antd';
import {Avatar} from "../common";

interface DataType {
    key: string;
    usuario:string;
    rol: string;
    email: string;
    grupos: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Usuario',
        dataIndex: 'usuario',
        key: 'usuario',
        render: (name) => (
            <Flex align="center" gap="var(--sm-space)">
                <Avatar name={name} type={"invitate"}/>
                {name}
            </Flex>
        )
    },
    {
        title: 'Rol',
        dataIndex: 'rol',
        key: 'rol',
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
]

const data: DataType[] = [
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
]


export const TableInvitados = () => {
    return (<Table columns={columns} dataSource={data}/>)
}