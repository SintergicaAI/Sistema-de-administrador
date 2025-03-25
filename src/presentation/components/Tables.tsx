import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {TableAdministration} from "./Administration/TableAdministration.tsx";
import {TableInvitados} from "./Administration/TableInvitados.tsx";

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps['items'] = [
    {
        key: '1',
        label: 'Activos',
        children: <TableAdministration/>,
    },
    {
        key: '2',
        label: 'Invitados',
        children: <TableInvitados/>,
    },
];
export const Tables = () =>{
    return (<>
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
    </>)
}