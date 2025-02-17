import {SideBarConfiguration} from "../common/SideBarConfiguration.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {userSelected} from './typeUserSelected.ts'
import {Content} from  './SiderContent.tsx';

export const SidebarTableAdministration = ({userSelected,hasNotSelected}:{userSelected:userSelected,hasNotSelected:()=>{}}) => {
    const {fullName} = userSelected;
    return (
        <SideBarConfiguration
            childrenHeader={<Avatar name={fullName} style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}/>}
            contentChildren={<Content />}
            hasNotSelected={hasNotSelected}
        />
    )
}
