import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {ErrorGroup, GetGroupDTO} from "../../domain/types/CompanyTypes.ts";

export class GetGroupFromId {
    constructor(private groupRepository: GroupRepository) {
    }

    async execute(groupId: string): Promise<GetGroupDTO|ErrorGroup> {
        return await this.groupRepository.getGroupFromId(groupId)
    }
}