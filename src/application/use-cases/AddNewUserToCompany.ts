import {InvitationRepository} from "../../domain/repositories/InvitationRepository.ts";

export class AddNewUserToCompany {
    constructor(private invitationApi: InvitationRepository) {}

     async  execute(email:string, body?:string):Promise<boolean> {
        return this.invitationApi.sendInvitationEmail(email, body);
    }
}