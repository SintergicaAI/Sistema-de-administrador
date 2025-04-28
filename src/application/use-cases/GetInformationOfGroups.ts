import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {GetGroupDTO} from "../../domain/types/CompanyTypes.ts";

export class GetInformationOfGroups{
    constructor(private groupRepository: GroupRepository) {
    }

    async execute(): Promise<GetGroupDTO[]> {
        return await this.groupRepository.getGroups();
    }
}