import {SideBarGeneral} from "../common/SideBarGeneral.tsx";
import {SiderContent} from  './SiderContent.tsx';
import {useAdministration} from "../../context/Administration";
import {SiderBarTableHeader} from "./SiderBarTableHeader.tsx";

export const SidebarTableAdministration = () => {
    const {changeHasSelected} = useAdministration();
    return (
        <SideBarGeneral
            childrenHeader={<SiderBarTableHeader/>}
            contentChildren={<SiderContent/>}
            hasSelected={changeHasSelected}
        />
    )
}
