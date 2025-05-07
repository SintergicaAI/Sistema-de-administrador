import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";

export class DeleteGroupFromUser {
    constructor(private companyRepository: CompanyRepository) {
    }

    async execute(group:string,email:string):Promise<boolean>{
        return this.companyRepository.deleterUserFromCompany(group,email);
    }
}