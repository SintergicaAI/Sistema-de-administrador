import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";

export class ChangeGroupName {
    constructor(private groupRepository:GroupRepository) {}

    async execute(group:GroupBasicInfo):Promise<boolean> {
        return await this.groupRepository.changeGroupName(group);
    }
}