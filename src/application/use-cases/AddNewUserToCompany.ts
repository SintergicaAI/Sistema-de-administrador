import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";

export class AddNewUserToCompany {
    constructor(private companyApi: CompanyRepository) {}

     async  execute(email:string):Promise<boolean> {
        return this.companyApi.addNewUserToCompany(email);
    }
}