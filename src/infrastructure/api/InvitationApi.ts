import {InvitationRepository} from "../../domain/repositories/InvitationRepository.ts";
import {InvitateUserDTO} from "../../domain/types/InvitationTypes.ts";
import {Common} from "./Common.ts";

export class InvitationApi extends Common implements InvitationRepository {


    async sendInvitationEmail(email: string, body?:string): Promise<boolean> {
        const token = this.authApi.getToken();

        try{
            const response = await  fetch(`${this.baseUrl}/invitation/send`,{
                method: "POST",
                body: JSON.stringify({recipients: email,body:body,subject:""}),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            })
            //Refrescar el token
            if(response.status === 403) {
                await this.refreshToke();
                await this.sendInvitationEmail(email);
            }

            const data:string = await response.json();
            return Promise.resolve(data.length > 0);
        }catch (error){
            return false;
        }
    }

    async getInvitedUsers(): Promise<InvitateUserDTO[]> {
        const token = this.authApi.getToken();

        try{
            const response = await fetch(`${this.baseUrl}/invitation`, {
                method:'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            if(response.status === 403){
                await this.refreshToke();
                await this.getInvitedUsers();
            }
            return await response.json();

        }catch(err){
            return Promise.reject([])
        }
    }

}