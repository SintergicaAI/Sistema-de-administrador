import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {SideBarGeneral} from "../common/SideBarGeneral.tsx";
import {Typography} from "antd";

const {Title} = Typography;

export const SiderGroup = ()=>{
    const {setHasSelected, sideHeaderText} = useGroupContext();
    return (
            <SideBarGeneral
                childrenHeader={<Title level={3}>{sideHeaderText}</Title>}
                contentChildren={<p>Contenido</p>}
                hasSelected={setHasSelected}/>
        )
}