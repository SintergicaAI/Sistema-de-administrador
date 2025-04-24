import {createContext} from "react";

export type SideContentType = 'conocimiento' | 'asistentes' | 'usuarios' | '';

interface GroupContextType {
    totalGroups: number,
    setTotalGroups:(newTotalGroups: number) => void,
    hasSelected:boolean,
    setHasSelected:(newHasSelected: boolean) => void,
    sideHeaderText:string,
    setSideHeaderText:(newSideHeaderText: string) => void,
    sideContent:SideContentType,
    setSideContent:(newSiderContent: SideContentType) => void,
    filterValue:string,
    setFilterValue:(newFilterGroups: string) => void,
}

export const GroupContext = createContext<GroupContextType|null>(null)