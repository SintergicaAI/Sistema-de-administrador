import {SideBarConfiguration} from "../common/SideBarConfiguration.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {userSelected} from './AdministrationTypes.ts'
import {Content} from  './SiderContent.tsx';
import {Dispatch} from "react";



export const SidebarTableAdministration = ({userSelected,hasNotSelected}:{userSelected:userSelected,hasNotSelected:Dispatch<any>}) => {
    const {first_name} = userSelected;
    return (
        <SideBarConfiguration
            childrenHeader={<Avatar name={first_name} style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}/>}
            contentChildren={<Content />}
            hasNotSelected={hasNotSelected}
        />
    )
}
