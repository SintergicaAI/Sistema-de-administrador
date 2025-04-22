import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";

export class AddUserToGroupCompany {
    constructor(private companyRepository: CompanyRepository) {}

    async execute (email: string, groups:string[]): Promise<boolean> {
        return this.companyRepository.addUserToGroupCompany(email, groups);
    }
}