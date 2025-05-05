import {GetGroupDTO, GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";

export const getGroupBasicInfo = (groups:GetGroupDTO[]):GroupBasicInfo[]=> {
    return groups.map(group => {
        return { group_id:group.group_id, name:group.name }
    })
}