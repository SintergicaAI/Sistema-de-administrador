import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {SideBarGeneral} from "../common/SideBarGeneral.tsx";
import {Typography} from "antd";
import {useEffect, useState} from "react";
import {SiderContentConocimiento} from "./SiderContentConocimiento.tsx";
import {SiderContentUsuarios} from "./SiderContentUsuarios.tsx";
import {SiderContentAsistentes} from "./SiderContentAsistentes.tsx";

const {Title} = Typography;
type SideContentType = React.ReactNode;

export const SiderGroup = ()=>{
    const {setHasSelected,
            sideContent,
        sideHeaderText} = useGroupContext();

    const [SideContentRender,setSideContentRender] = useState<SideContentType|null>(null)

    //Control which content render base on

    useEffect(()=>{
        switch (sideContent) {

            case 'conocimiento':
                setSideContentRender(<SiderContentConocimiento/>);
                break;
            case 'usuarios':
                setSideContentRender(<SiderContentUsuarios/>);
                break;
            case 'asistentes':
                setSideContentRender(<SiderContentAsistentes/>);
                break;
            default:
                setSideContentRender(null);
        }
    },[sideContent]);

    return (
            <SideBarGeneral
                childrenHeader={<Title level={3}
                                       style={{
                                           marginBlock:0,
                                           fontSize:16
                }}>{sideHeaderText}</Title>}
                contentChildren={SideContentRender}
                hasSelected={setHasSelected}/>
        )
}