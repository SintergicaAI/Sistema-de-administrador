import { GroupContext } from "./GroupContext"
import {ReactNode, useState} from "react";

export const GroupContextProvider = ({children}:{children:ReactNode}) =>{
    const [totalGroups, setTotalGroups] = useState(0)

    return (<GroupContext.Provider value={
        {
            totalGroups:totalGroups,
            setTotalGroups:setTotalGroups,
        }
    }>
        {children}
    </GroupContext.Provider>)
}