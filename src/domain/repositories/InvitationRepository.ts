import {InvitateUserDTO} from "../types/InvitationTypes.ts";

export interface InvitationRepository {
    sendInvitationEmail(email:string):Promise<boolean>;
    getInvitedUsers():Promise<InvitateUserDTO[]>
}