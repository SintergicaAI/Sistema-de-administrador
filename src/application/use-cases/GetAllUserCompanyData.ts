import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";
import {UserList, UserSearchParams} from "../../domain/types/CompanyTypes.ts";

export class GetAllUserCompanyData {

    constructor(private getAllUsersFromCampany:CompanyRepository ){}

    async execute(params:UserSearchParams | {}):Promise<UserList>{
        return await this.getAllUsersFromCampany.findUsersInCompany(params);
    }
}