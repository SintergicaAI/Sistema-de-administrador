import {GroupContext, SideContentType, tags} from "./GroupContext"
import {ReactNode, useState} from "react";

export const GroupContextProvider = ({children}:{children:ReactNode}) =>{
    const [totalGroups, setTotalGroups] = useState(0);
    const [hasSelected, setHasSelected] = useState(false);
    const [sideHeaderText, setSideHeaderText] = useState("");
    const [sideContent, setSideContent] = useState<SideContentType>("");
    const [filterValue,setFilterValue] = useState("");
    const [conocimientoTagsSelected, setConocimientoTagsSelected] = useState<tags[]>([]);

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
            setConocimientoTagsSelected
        }
    }>
        {children}
    </GroupContext.Provider>)
}