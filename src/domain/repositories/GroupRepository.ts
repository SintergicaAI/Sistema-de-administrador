import {GetGroupDTO, GroupBasicInfo} from "../types/CompanyTypes.ts";

export interface GroupRepository {
    getGroups():Promise<GetGroupDTO[]>;
    deleteGroup(groupId:string):Promise<GroupBasicInfo|{}>;
}