import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";

export class GetAllUserCompanyData {

    constructor(private getAllUsersFromCampany:TableOperationRepository ){}

    async execute():Promise<any[]>{
        return await this.getAllUsersFromCampany.getAllUsersFromCampany(0,0);
    }
}