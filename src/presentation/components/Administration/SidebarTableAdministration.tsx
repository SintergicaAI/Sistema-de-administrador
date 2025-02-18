import {SideBarConfiguration} from "../common/SideBarConfiguration.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {DataType} from './types/TableAdministrationTypes.ts'
import {SiderContent} from  './SiderContent.tsx';
import {useContext} from "react";
import {AdministrationContext} from "../../context/Administration/AdministrationContext.tsx";



export const SidebarTableAdministration = () => {
    const {selectedRow,changeHasSelected} = useContext(AdministrationContext);
    const {name} = selectedRow as DataType;
    return (
        <SideBarConfiguration
            childrenHeader={<Avatar name={`${name}`} style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}/>}
            contentChildren={<SiderContent/>}
            hasSelected={changeHasSelected}
        />
    )
}
