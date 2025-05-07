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
        const token = this.verifiedAuthorizationToken();
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


    async deleteGroup(groupId: string): Promise<GroupBasicInfo|ErrorGroup> {
        const token = this.verifiedAuthorizationToken();

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
        const token = this.verifiedAuthorizationToken();

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

    async addUserToGroup(groupId: string, email:string): Promise<GroupBasicInfo | ErrorGroup> {
        const token = this.verifiedAuthorizationToken();
        try{
            const response = await fetch(`${this.baseUrl}/company/groups/${groupId}/member/${email}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    ContentType: "application/json"
                }
            });

            if(!response.ok){
                await this.refreshToke();
                const data:ErrorGroup = await response.json();
                return data;
            }
            const data:GroupBasicInfo = await response.json();
            return data;
        }catch(e){
            return Promise.reject(e);
        }

    }

    async deleteUserFromGroup(groupId: string, email: string): Promise<GroupBasicInfo | ErrorGroup> {
        const token = this.verifiedAuthorizationToken();

        try{
            const response = await fetch(`${this.baseUrl}/company/groups/${groupId}/member/${email}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    ContentType: "application/json"
                }
            });

            if(!response.ok){
                await this.refreshToke();
                const data:ErrorGroup = await response.json();
                return data;
            }
            const data:GroupBasicInfo = await response.json();
            return data;
        }catch(e){
            return Promise.reject(e);
        }
    }
}