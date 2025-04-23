import { GroupContext } from "./GroupContext"
import {ReactNode, useState} from "react";

export const GroupContextProvider = ({children}:{children:ReactNode}) =>{
    const [totalGroups, setTotalGroups] = useState(0);
    const [hasSelected, setHasSelected] = useState(false);
    const [sideHeaderText, setSideHeaderText] = useState("");

    return (<GroupContext.Provider value={
        {
            totalGroups:totalGroups,
            setTotalGroups:setTotalGroups,
            hasSelected:hasSelected,
            setHasSelected:setHasSelected,
            setSideHeaderText,
            sideHeaderText:sideHeaderText,
        }
    }>
        {children}
    </GroupContext.Provider>)
}