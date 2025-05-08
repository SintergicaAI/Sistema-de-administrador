import {ErrorGroup, GetGroupDTO, GroupBasicInfo} from "../types/CompanyTypes.ts";

export interface GroupRepository {
    getGroups():Promise<GetGroupDTO[]>;
    getGroupFromId(id: string):Promise<GetGroupDTO|ErrorGroup>;
    deleteGroup(groupId:string):Promise<GroupBasicInfo|ErrorGroup>;
    addUserToGroup(groupId:string, email:string):Promise<GroupBasicInfo|ErrorGroup>;
    deleteUserFromGroup(groupId:string, email:string):Promise<GroupBasicInfo|ErrorGroup>;
    addMultipleUserToGroup(groupId:string, emails:string[]):Promise<boolean>;
}