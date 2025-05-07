import {createContext} from "react";
import {AvatarUserInfo, Model, SideContentType, Tags} from "../../components/Groups/GroupsTypes";
import {AlertConfigurationType} from "../../components/common/CommonTypes.ts";

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
    actualGroupName:string,
    setActualGroupName:(newActualGroupName: string) => void,
    AlertConfiguration:AlertConfigurationType|{},
    setAlertConfiguration:(newAlertConfiguration: AlertConfigurationType) => void,
    showAlert:boolean,
    setShowAlert:(alert: boolean) => void,
}

export const GroupContext = createContext<GroupContextType|null>(null)