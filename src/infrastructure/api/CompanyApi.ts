import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";
import { User } from "../../domain/entities/User";
import {PaginableResponse} from "./types/PaginableResponse.ts";
import {UserDeleted, UserList, UserSearchParams} from "../../domain/types/CompanyTypes.ts";
import {getRole} from "../../presentation/utilities/getRole.ts";
import {Common} from "./Common.ts";


export class CompanyApi extends Common implements CompanyRepository {
    get ListUserCache(): UserList {
        return this._ListUserCache;
    }

    set ListUserCache(value: UserList) {
        this._ListUserCache = value;
    }

    private _ListUserCache:UserList = {
        users:[],
        total:0,
    }

    async deleteUser(email: string): Promise<UserDeleted> {
        const response = await fetch(`${this.baseUrl}/company/users/${email}`,{
            method:'DELETE',
            headers:{
                Authorization:`Bearer ${this.authApi.getToken()}`
            }
        });

        if(!response.ok) {
            return Promise.reject(response.statusText);
        }
        const user:UserDeleted ={email:email};
        return Promise.resolve(user);
    }

    async findUsersInCompany(searchParams: UserSearchParams | {}): Promise<UserList> {

        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }
        let  queryParams:URLSearchParams = new URLSearchParams();

        if ("page" in searchParams) {
            queryParams = new URLSearchParams({
                page: searchParams.page?.toString() || '',
                size: searchParams.size?.toString() || '',
                groups: searchParams.groups || '',
                fullname: searchParams.query
            });
            if((queryParams.get("fullname") as string).length === 0) queryParams.delete("fullname");
            if((queryParams.get("groups") as string).length === 0) queryParams.delete("groups");
        }

        if(this._ListUserCache.total == 0){
            let response = new Response();
            try{
                response = await fetch(
                    `${this.baseUrl}/company/users?${queryParams}`,
                    {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    }
                );
            }catch(e){
                await this.refreshToke();
                await this.findUsersInCompany(searchParams);
            }
                const {data,totalElements}:PaginableResponse = await response.json();
                 this._ListUserCache=  {users:data.map((userData) => new User(
                        "",
                        userData.email,
                        getRole( userData.role.name),
                        userData.name,
                        userData.lastName,
                        undefined,
                        userData.groups,
                        undefined
                    )), total:totalElements}
            }
        return this._ListUserCache;


    }

    async addUserToGroupCompany(email: string, group: string[]): Promise<boolean> {
        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }
        try{
            const response = await fetch(`${this.baseUrl}/company/users/${email}/groups`,{
                method: 'PATCH',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({group_ids:group}),
            })
            //Refrescar el token
            if(response.status === 403) {
                await this.refreshToke()
                await this.addUserToGroupCompany(email, group);
            }

            return Promise.resolve(true);
        }catch (e) {
            console.log(e)
            return Promise.resolve(false);
        }
    }

    async changeUserRoleFromCompany(email: string, role: string): Promise<boolean> {

        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }
        try{
            const response = await fetch(`${this.baseUrl}/users/${email}/rol`,{
                method: 'PATCH',
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({name:role}),
            })

            if(response.status === 403) {
                await this.refreshToke()
                await this.changeUserRoleFromCompany(email,role);
            }
            return Promise.resolve(true);
        }catch (e) {
            console.log(e)
            return Promise.resolve(false);
        }
    }
}