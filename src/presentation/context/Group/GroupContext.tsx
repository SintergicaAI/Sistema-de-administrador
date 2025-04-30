import {createContext} from "react";
import {Model, SideContentType, Tags} from "../../components/Groups/GroupsTypes";
import {AvatarUserInfo} from "../../../domain/types/CompanyTypes.ts";



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
    asistentesSelected:Model[],
    setAsistentesSelected:(newAsistentesSelected: Model[]) => void,
    membersGroup:AvatarUserInfo[],
    setMembersGroup:(newMembersGroup: AvatarUserInfo[]) => void,

}

export const GroupContext = createContext<GroupContextType|null>(null)