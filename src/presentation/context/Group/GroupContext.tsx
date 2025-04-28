import {createContext} from "react";
import {SideContentType, Tags} from "../../components/Groups/GroupsTypes";



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
    conocimientoTagsSelected:Tags[],
    setConocimientoTagsSelected:(newConocimientoTags: Tags[]) => void,

}

export const GroupContext = createContext<GroupContextType|null>(null)