import {ErrorGroup, GetGroupDTO, GroupBasicInfo} from "../types/CompanyTypes.ts";

export interface GroupRepository {
    getGroups():Promise<GetGroupDTO[]>;
    getGroupFromId(id: string):Promise<GetGroupDTO|ErrorGroup>;
    deleteGroup(groupId:string):Promise<GroupBasicInfo|ErrorGroup>;
}