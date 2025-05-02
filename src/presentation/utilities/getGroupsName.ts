import {GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";


export const getGroupsNames = (groups:GroupBasicInfo[])=>{
    return groups.map(item=> item.name);
}

export const getGroupNameInLowerCase = (groups:GroupBasicInfo[])=>{
    return groups.map(item=>item.name.toLowerCase());
}