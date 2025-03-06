import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";

export class GetCompanyGroups {

    constructor(private companyRepository: CompanyRepository) {
    }

    async execute(): Promise<string[]> {
        return this.companyRepository.getCompanyGroups();
    }
}