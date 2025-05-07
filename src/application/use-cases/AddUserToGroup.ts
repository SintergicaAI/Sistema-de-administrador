import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {ErrorGroup, GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";

export class AddUserToGroup {
    constructor(private groupRepository:GroupRepository) {

    }

     execute(groupId:string, email:string):Promise<GroupBasicInfo|ErrorGroup>{
        return this.groupRepository.addUserToGroup(groupId, email);
    }
}