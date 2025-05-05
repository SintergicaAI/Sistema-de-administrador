
import {InvitateUserDTO} from "../../domain/types/CompanyTypes.ts";
import {InvitationRepository} from "../../domain/repositories/InvitationRepository.ts";


export class GetInvitedUsers {
    constructor(private invitationApi: InvitationRepository) {}

    async execute():Promise<InvitateUserDTO[]>{
        return await this.invitationApi.getInvitedUsers();
    }
}