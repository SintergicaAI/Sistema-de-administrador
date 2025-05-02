import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {GetGroupDTO} from "../../domain/types/CompanyTypes.ts";
import {Common} from "./Common.ts";


export class GroupApi extends Common implements GroupRepository{


    private groups:GetGroupDTO[]|null = null;

    async getGroups(): Promise<GetGroupDTO[]> {
        const token = this.authApi.getToken();

        if(!token){
            throw Error(`Token not found`);
        }
        if(this.groups == null){
            try{
                const response = await fetch(`${this.baseUrl}/company/groups`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        ContentType: "application/json"
                    }
                });

                if(!response.ok){
                    await this.refreshToke();
                    await this.getGroups();
                }
                const data:GetGroupDTO[] = await response.json();
                this.groups = data;
                return data;
            }
            catch(e){
               return Promise.reject(e);
            }
        }
        else{

            return Promise.resolve( this.groups ) ;
        }
    }


}