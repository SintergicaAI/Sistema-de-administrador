import {InvitationRepository} from "../../domain/repositories/InvitationRepository.ts";
import {InvitateUserDTO} from "../../domain/types/InvitationTypes.ts";
import {AuthApi} from "./AuthApi.ts";

const LOCAL_TEST= 'http://localhost';

export class InvitationApi implements InvitationRepository {
    private authApi;

    constructor(){
        this.authApi = new AuthApi();
    }

    async sendInvitationEmail(email: string): Promise<boolean> {
        const token = this.authApi.getToken();

        try{
            const response = await  fetch(`${LOCAL_TEST}/invitaton/send`,{
                method: "POST",
                body: JSON.stringify({recipients: email,body:'',subject:""}),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
            })
            const data:string = await response.json();
            return Promise.resolve(data.length > 0);
        }catch (error){
            return false;
        }
    }

    private async refreshToke() {
        return this.authApi.getNewToken(this.authApi.getRefreshToken() as string)
    }

    async getInvitedUsers(): Promise<InvitateUserDTO[]> {
        const token = this.authApi.getToken();

        try{
            const response = await fetch(`${LOCAL_TEST}/invitation`, {
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