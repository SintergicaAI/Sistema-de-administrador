import {GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";

export const getGroupNameFromId = (id: string, groups:GroupBasicInfo[]) => {
    return groups.find(item => item.group_id === id) as any;
}