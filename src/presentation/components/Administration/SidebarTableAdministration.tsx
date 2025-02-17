import {SideBarConfiguration} from "../common/SideBarConfiguration.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {DataType} from './types/TableAdministrationTypes.ts'
import {Content} from  './SiderContent.tsx';
import {Dispatch} from "react";



export const SidebarTableAdministration = (
    {userSelected,hasNotSelected}:{userSelected:DataType,hasNotSelected:Dispatch<any>}) => {
    const {name} = userSelected;
    return (
        <SideBarConfiguration
            childrenHeader={<Avatar name={`${name}`} style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}/>}
            contentChildren={<Content groups={userSelected.groups} rol={userSelected.role}/>}
            hasNotSelected={hasNotSelected}
        />
    )
}
