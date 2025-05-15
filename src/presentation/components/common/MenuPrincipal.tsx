import React, {CSSProperties} from "react";
import {Menu, MenuProps} from "antd";
import {To, useNavigate} from "react-router";
import {UserPen, SquareTerminal, MessageCircle, Users, Building2} from 'lucide-react';
import {Avatar } from './index.ts';

type MenuItem = Required<MenuProps>['items'][number];

const iconSize:CSSProperties = {
    width:24,
    height:24,
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const menuStyle:React.CSSProperties = {
    borderInlineEnd: 'none',
    flexGrow:1,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    paddingInline: '0',
    alignItems: 'center',
}


const items: MenuItem[] = [
    /*TODO:Generar funcionalidad que extrae del localStorage el nombre del usuario
    *  Para colocarlo en el componente Avatar*/
    getItem('User', '/profile', <Avatar name={'G'} style={{backgroundColor:'var(--c_white)'}}/>),
    getItem('Workspace', '/workspace', <SquareTerminal  style={iconSize}/>,
        [
            getItem('Knowledge', '/workspace/knowledge'),
            getItem('Models', '/workspace/models'),
        ]),
    getItem('Knowledge', '/knowledge', <MessageCircle style={iconSize}/>),
    getItem('Admin','/administration', <UserPen style={iconSize}/>),
    getItem('Groups','/groups', <Users style={iconSize}/>),
    getItem('Company','/company', <Building2 style={iconSize} />)
    ,
];

export const MenuPrincipal = ()=>{


    const navigate = useNavigate();

    const handleMenuClick = (e: { key: To; }) => {
        navigate(e.key);
    }

    return (
        <Menu onClick={handleMenuClick} defaultSelectedKeys={['1']} mode="inline" items={items} style={menuStyle}/>
    )
}