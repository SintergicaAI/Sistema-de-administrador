import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository.ts";

export class GetAllUserCompanyData {

    constructor(private getAllUsersFromCampany:CompanyRepository ){}

    async execute(params:UserSearchParams | {}):Promise<UserList>{
        return await this.getAllUsersFromCampany.findUsersInCompany(params);
    }
}