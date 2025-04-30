import {InvitationApi} from "../../infrastructure/api/InvitationApi.ts";

export class DeleteInvitation {
    constructor(private invitationApi: InvitationApi) {}

    async execute(email: string): Promise<void> {
        return this.invitationApi.deleteInvitation(email);
    }
}