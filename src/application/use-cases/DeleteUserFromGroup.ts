import {ErrorGroup, GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";
import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";

export class DeleteUserFromGroup {
    constructor(private groupRepository:GroupRepository) {
    }

    execute(groupId:string, email:string):Promise<GroupBasicInfo|ErrorGroup> {
        return this.groupRepository.deleteUserFromGroup(groupId, email)
    }
}