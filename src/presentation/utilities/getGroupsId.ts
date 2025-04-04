import {GroupType} from "../../domain/types/CompanyTypes.ts";

export const getGroupId = (groups:GroupType[])=>{
    return groups.map(item=>item.group_id);
}