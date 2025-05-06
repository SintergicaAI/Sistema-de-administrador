import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {ErrorGroup, GetGroupDTO, GroupBasicInfo} from "../../domain/types/CompanyTypes.ts";
import {Common} from "./Common.ts";

export class GroupApi extends Common implements GroupRepository{
    get groups(): GetGroupDTO[] | null {
        return this._groups;
    }

    set groups(value: GetGroupDTO[] | null) {
        this._groups = value;
    }


    private _groups:GetGroupDTO[]|null = null;

    async getGroups(): Promise<GetGroupDTO[]> {
        const token = this.authApi.getToken();

        if(!token){
            throw Error(`Token not found`);
        }
        if(this._groups == null){
            console.log("El grupo es nulo, se ejeucto");
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
                this._groups = data;
                return data;
            }
            catch(e){
               return Promise.reject(e);
            }
        }
        else{

            return Promise.resolve( this._groups ) ;
        }
    }

    async deleteGroup(groupId: string): Promise<GroupBasicInfo|ErrorGroup> {
        const token = this.authApi.getToken();

        if(!token){
            throw Error(`Token not found`);
        }
        try{
            const response = await fetch(`${this.baseUrl}/group/${groupId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    ContentType: "application/json"
                }
            });
            if(!response.ok){
                await this.refreshToke();
                await this.deleteGroup(groupId);
            }
            const data:GroupBasicInfo = await response.json();
            return Promise.resolve(data);
        }catch (e){
            return Promise.reject({});
        }
    }

    async getGroupFromId(id: string): Promise<GetGroupDTO| ErrorGroup> {
        const token = this.authApi.getToken();

        if(!token){
            throw Error(`Token not found`);
        }
            try{
                const response = await fetch(`${this.baseUrl}/group/${id}`, {
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
                const data:GetGroupDTO = await response.json();
                return data;
            }
            catch(e){
                return Promise.reject(e);
            }

    }
}