import {InvitateUserDTO} from "../types/InvitationTypes.ts";

export interface InvitationRepository {
    sendInvitationEmail(email:string, body?:string):Promise<boolean>;
    getInvitedUsers():Promise<InvitateUserDTO[]>
}