
import {GetGroupDTO} from "../../domain/types/CompanyTypes.ts";
import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";

export class GetCompanyGroups {

    constructor(private companyRepository: GroupRepository) {
    }

    async execute(): Promise<GetGroupDTO[]> {
        return this.companyRepository.getGroups();
    }
}