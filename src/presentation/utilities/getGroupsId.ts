import {GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";

export const getGroupId = (groups:GroupBasicInfo[])=>{
    return groups.map(item=>item.group_id);
}