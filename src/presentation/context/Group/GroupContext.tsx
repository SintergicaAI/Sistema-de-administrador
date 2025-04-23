import {createContext} from "react";

interface GroupContextType {
    totalGroups: number,
    setTotalGroups:(newTotalGroups: number) => void,
    hasSelected:boolean,
    setHasSelected:(newHasSelected: boolean) => void,
    sideHeaderText:string,
    setSideHeaderText:(newSideHeaderText: string) => void,
}

export const GroupContext = createContext<GroupContextType|null>(null)