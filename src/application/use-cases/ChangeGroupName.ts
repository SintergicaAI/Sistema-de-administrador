import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";

export class ChangeGroupName {
    constructor(private groupRepository:GroupRepository) {}

    async execute(groupId:string,groupName:string):Promise<boolean> {
        return await this.groupRepository.changeGroupName(groupId,groupName);
    }
}