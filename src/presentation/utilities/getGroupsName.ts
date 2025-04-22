import {GroupType} from "../../domain/types/CompanyTypes.ts";


export const getGroupsNames = (groups:GroupType[])=>{
    return groups.map(item=> item.name);
}

export const getGroupNameInLowerCase = (groups:GroupType[])=>{
    return groups.map(item=>item.name.toLowerCase());
}