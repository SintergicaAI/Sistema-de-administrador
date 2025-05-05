import {AvatarUserInfo, Model, SideContentType, Tags} from "../../components/Groups/GroupsTypes";
import {GroupContext} from "./GroupContext"
import {ReactNode, useState} from "react";

export const GroupContextProvider = ({children}:{children:ReactNode}) =>{
    const [totalGroups, setTotalGroups] = useState(0);
    const [hasSelected, setHasSelected] = useState(false);
    const [sideHeaderText, setSideHeaderText] = useState("");
    const [sideContent, setSideContent] = useState<SideContentType>("");
    const [filterValue,setFilterValue] = useState("");
    const [conocimientoTagsSelected, setConocimientoTagsSelected] = useState<Tags[]>([]);
    const [asistentesSelected,setAsistentesSelected] = useState<Model[]>([]);
    const [membersGroup,setMembersGroup] = useState<AvatarUserInfo[]>([]);
    const [actualGroupName, setActualGroupName] = useState<string>("");

    return (<GroupContext.Provider value={
        {
            totalGroups:totalGroups,
            setTotalGroups:setTotalGroups,
            hasSelected:hasSelected,
            setHasSelected:setHasSelected,
            setSideHeaderText,
            sideHeaderText:sideHeaderText,
            setSideContent,
            sideContent:sideContent,
            filterValue,
            setFilterValue,
            conocimientoTagsSelected,
            setConocimientoTagsSelected,
            asistentesSelected,
            setAsistentesSelected,
            membersGroup,
            setMembersGroup,
            actualGroupName,
            setActualGroupName
        }
    }>
        {children}
    </GroupContext.Provider>)
}