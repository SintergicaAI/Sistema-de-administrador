import {InvitationRepository} from "../../domain/repositories/InvitationRepository.ts";

export class SendInvitationEmail {
    constructor(private invitationRepository: InvitationRepository) {}

    async execute(email: string): Promise<boolean> {
        const wasSend = await this.invitationRepository.sendInvitationEmail(email);
        return wasSend;
    }
}