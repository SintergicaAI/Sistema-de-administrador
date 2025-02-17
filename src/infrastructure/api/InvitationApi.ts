import {InvitationRepository} from "../../domain/repositories/InvitationRepository.ts";

const LOCAL_TEST= 'http://localhost:3000';

export class InvitationApi implements InvitationRepository {


    async sendInvitationEmail(email: string): Promise<boolean> {
        const respose = await  fetch(`${LOCAL_TEST}/invitaton`)
        if (respose.status !== 200) {
            return Promise.reject("Hubo un problema para enviar la invitacion");
        }
        return Promise.resolve(true);
    }
}