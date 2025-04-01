import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";

export class ChangeUserRoleFromCompany{
    constructor(private companyRepository:CompanyRepository) {
    }

    async execute(email:string, role:string):Promise<boolean> {
        return await this.companyRepository.changeUserRoleFromCompany(email, role);
    }
}