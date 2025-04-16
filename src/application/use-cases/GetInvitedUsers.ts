import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";
import {InvitateUserDTO} from "../../domain/types/CompanyTypes.ts";


export class GetInvitedUsers {
    constructor(private companyApi: CompanyRepository) {}

    async execute():Promise<InvitateUserDTO[]>{
        return await this.companyApi.getInvitedUsers();
    }
}