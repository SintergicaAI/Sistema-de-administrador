import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";

export class AddMultipleUsersToGroup {
    constructor(private groupRepository: GroupRepository) {
    }

    async execute(groupId:string, emails:string[]):Promise<boolean> {
        return await this.groupRepository.addMultipleUserToGroup(groupId, emails);
    }
}