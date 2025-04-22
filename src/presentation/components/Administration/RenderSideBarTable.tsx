import {useAdministration} from "../../context/Administration";
import {SidebarTableAdministration} from "./SidebarTableAdministration.tsx";

export const RenderSideBarTable = ()=>{
    const {hasSelected} = useAdministration();

    return (<>
        {
            hasSelected && <SidebarTableAdministration/>
        }
    </>)
}