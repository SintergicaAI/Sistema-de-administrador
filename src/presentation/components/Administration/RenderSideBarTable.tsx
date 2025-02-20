import {useContext} from "react";
import {AdministrationContext} from "../../context/Administration/AdministrationContext.tsx";
import {SidebarTableAdministration} from "./SidebarTableAdministration.tsx";

export const RenderSideBarTable = ()=>{
    const {hasSelected} = useContext(AdministrationContext);

    return (<>
        {
            hasSelected &&
            (<SidebarTableAdministration/>)
        }
    </>)
}