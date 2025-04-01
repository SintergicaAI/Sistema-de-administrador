import {GroupType} from "../../domain/types/CompanyTypes.ts";

export const getGroupNameFromId = (id: string, groups:GroupType[]) => {
    return groups.find(item => item.group_id === id);
}