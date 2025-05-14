import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {GroupCreated} from "../../domain/types/CompanyTypes.ts";

export class AddNewGroupToCompany {
    constructor(private groupRepository: GroupRepository) {}

    async execute(group:GroupCreated):Promise<boolean> {
        return await this.groupRepository.createGroup(group);
    }
}