import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";

export class DeleteGroup {
    constructor(private groupApi:GroupRepository) {
    }

    async execute(groupId: string): Promise<GroupBasicInfo| {}> {
        return await this.groupApi.deleteGroup(groupId);
    }
}