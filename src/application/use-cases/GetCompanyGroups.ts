import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";
import {GroupType} from "../../domain/types/CompanyTypes.ts";

export class GetCompanyGroups {

    constructor(private companyRepository: CompanyRepository) {
    }

    async execute(): Promise<GroupType[]> {
        return this.companyRepository.getCompanyGroups();
    }
}