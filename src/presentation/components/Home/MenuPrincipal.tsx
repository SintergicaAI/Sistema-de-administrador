import React from "react";
import type {MenuItem} from "../type/MenuPrincipal.ts"
import {Menu} from "antd";
import {To, useNavigate} from "react-router";
import {UserRound as IconUser, UserPen, SquareTerminal, MessageCircle,} from 'lucide-react';


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

const items: MenuItem[] = [
    getItem('User', '/profile', <IconUser/>),
    getItem('Workspace', '/workspace', <SquareTerminal />,
        [
            getItem('Knowledge', '/workspace/knowledge'),
            getItem('Models', '/workspace/models'),
        ]),
    getItem('Knowledge', '/knowledge', <MessageCircle />),
    getItem('Admin','/administration', <UserPen />),
];

export const MenuPrincipal = ()=>{


    const navigate = useNavigate();

    const handleMenuClick = (e: { key: To; }) => {
        navigate(e.key);
    }

    return (
        <Menu onClick={handleMenuClick} defaultSelectedKeys={['1']} mode="inline" items={items} style={{borderInlineEnd: 'none'}}/>
    )
}