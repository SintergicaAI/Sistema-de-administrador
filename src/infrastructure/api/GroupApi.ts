import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {ErrorGroup, GetGroupDTO, GroupBasicInfo, GroupCreated} from "../../domain/types/CompanyTypes.ts";
import {Common} from "./Common.ts";


export class GroupApi extends Common implements GroupRepository{
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
                    return Promise.reject(await response.json());
                }
                const data:GetGroupDTO[] = await response.json();
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
                return Promise.reject(await response.json())
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
                    return Promise.reject(await response.json());
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

   async  addMultipleUserToGroup(groupId: string, emails: string[]): Promise<boolean> {
        const token = this.verifiedAuthorizationToken();
        try{
            const response = await fetch(`${this.baseUrl}/company/groups/${groupId}/members`, {
                method: "PATCH",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({emailsMembers: emails})
            });
            if(!response.ok){
                await this.refreshToke();
                return Promise.reject(false);
            }
            return Promise.resolve(true);
        }catch(e){
            return Promise.reject(e);
        }
    }

    async createGroup(group: GroupCreated): Promise<boolean> {
        const token = this.verifiedAuthorizationToken();
        try{
            const response = await fetch(`${this.baseUrl}/group`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({name:group.name,groupKey:group.groupKey})
            });
            if(!response.ok){
                await this.refreshToke();
                return Promise.reject(false);
            }
            return Promise.resolve(true);
        }catch(e){
            return Promise.reject(e);
        }
    }

    changeGroupName(groupName: string): Promise<boolean> {
        return Promise.resolve(true);
    }
}