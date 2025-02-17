import {SideBarConfiguration} from "../common/SideBarConfiguration.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {userSelected} from './types/TableAdministrationTypes.ts'
import {Content} from  './SiderContent.tsx';
import {Dispatch} from "react";



export const SidebarTableAdministration = (
    {userSelected,hasNotSelected}:{userSelected:userSelected,hasNotSelected:Dispatch<any>}) => {
    const {first_name, last_name,groups,role} = userSelected;
    return (
        <SideBarConfiguration
            childrenHeader={<Avatar name={`${first_name} ${last_name}`} style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}/>}
            contentChildren={<Content groups={groups} rol={role}/>}
            hasNotSelected={hasNotSelected}
        />
    )
}
