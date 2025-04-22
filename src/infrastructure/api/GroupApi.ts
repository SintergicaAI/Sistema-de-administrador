import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {GetGroupDTO} from "../../domain/types/CompanyTypes.ts";
import {AuthApi} from "./AuthApi.ts";


export class GroupApi implements GroupRepository{

    private authApi:AuthApi;
    private baseUrl = "http://localhost";

    constructor(){
        this.authApi = new AuthApi();
    }

    async getGroups(): Promise<GetGroupDTO[]> {
        const token = this.authApi.getToken();

        if(!token){
            throw Error(`Token not found`);
        }
        try{
            const response = await fetch(`${this.baseUrl}/company/groups`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    ContentType: "application/json"
                }
            });

            if(!response.ok){
                return Promise.reject(response);
            }

            return await response.json();
        }

        catch(e){
           return Promise.reject(e);
        }
    }


}