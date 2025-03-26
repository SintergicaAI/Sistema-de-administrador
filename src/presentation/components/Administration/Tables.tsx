import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import {TableAdministration} from "./TableAdministration.tsx";
import {TableInvitados} from "./TableInvitados.tsx";

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
        <Tabs defaultActiveKey="1" items={items} />;
    </>)
}