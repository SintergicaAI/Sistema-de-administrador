import {message, Space, TableProps} from 'antd';
import {Flex, Table} from "antd";
import {Avatar} from "../common";
import {useEffect, useState} from "react";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetInvitedUsers} from "../../../application/use-cases/GetInvitedUsers.ts";
import {InvitateUserDTO} from "../../../domain/types/CompanyTypes.ts";
import {ButtonResendInvitation} from "./ModalInviteUser/ButtonResendInvitation.tsx";
import {ButtonDeleteInvitation} from "./ModalInviteUser/ButtonDeleteInvitation.tsx";


type DataType = {
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
        render: (groups) => (
            (groups === null ) ? <p>Sin grupos</p>:<p>{groups}</p>
        )
    },
    {
        title: 'Estado invitación',
        dataIndex: 'active',
        key: 'active',
        render:(active:boolean) => (
            active ? <p>Activa</p>: <p>Inactivo</p>
        )
    },
    {
        title: 'Acciones',
        key: 'actions',
        render: (_, record) => (
            <Space size="middle">
                <ButtonResendInvitation email={record.email}
                                        onSuccess={() =>
                                            message.success('Invitación reenviada exitosamente')

                }
                                        onError={(error) =>
                                            message.error(`Error al reenviar la invitación: ${error.message}`)
                                        }/>
                <ButtonDeleteInvitation  email={record.email}
                                         onSuccess={() =>
                                             message.success('Invitación cancelada exitosamente')
                                         }
                                         onError={() =>
                                             message.error('Error al cancelar la invitación.')
                                         }
                />

            </Space>
        ),
    },

]

const companyApi = new CompanyApi();
const getInvitedUsers = new GetInvitedUsers(companyApi);

const formatingData = (data:InvitateUserDTO[]) =>{
    const newData = data.map((userInvited, index) => {
        return {
            key: String(index),
            usuario: 'Invitado',
            email: userInvited.email,
            grupos: userInvited.group,
            active: userInvited.active,
        }
    });
    return newData;
}

export const TableInvitados = () => {
    const [data, setData] = useState<DataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const prepareData = () =>{
        getInvitedUsers.execute().then(res => {
            const formattedData= formatingData(res);
            setData(formattedData);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        prepareData();
    }, []);

    return (<Table
        columns={columns}
        loading={isLoading}
        dataSource={data}/>)
}