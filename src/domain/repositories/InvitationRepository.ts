export interface InvitationRepository {
    sendInvitationEmail(email:string):Promise<boolean>;
}