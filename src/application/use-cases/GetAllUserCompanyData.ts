import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";

export class GetAllUserCompanyData {

    constructor(private getAllUsersFromCampany:TableOperationRepository ){}

    async execute(page:number,size:number):Promise<any[]>{
        return await this.getAllUsersFromCampany.getAllUsersFromCampany(page,size);
    }
}