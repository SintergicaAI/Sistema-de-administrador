import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository.ts";
import {AuthApi} from "./AuthApi.ts";
import { User } from "../../domain/entities/User";
import {PaginableResponse} from "./types/PaginableResponse.ts";
import {InvitateUserDTO, UserDeleted} from "../../domain/types/CompanyTypes.ts";
import {getRole} from "../../presentation/utilities/getRole.ts";


//TODO:Refactorizar CompanyAPI y separarlo en otros modulos
export class CompanyApi implements CompanyRepository {
    private readonly baseUrl = `http://localhost`;
    private authApi: AuthApi;

    constructor() {
        this.authApi = new AuthApi();
    }
    private async refreshToke() {
        return this.authApi.getNewToken(this.authApi.getRefreshToken() as string)
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
        return {users:data.map((userData) => new User(
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

    async addNewUserToCompany(email:string): Promise<boolean> {
        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }
        try{
            const response = await fetch(`${this.baseUrl}/invitation/send`,{
                method: 'POST',
                body: JSON.stringify({recipients: email,body:'',subject:""}),
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            //Refrescar el token
            if(response.status === 403) {
                await this.refreshToke()
            }

            return true;
        }catch (e) {
            console.log(e)
            return false
        }
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
            //Refrescar el token
            if(response.status === 403) {
                await this.refreshToke()
                //await this.changeUserRoleFromCompany(email,role);
            }

            return Promise.resolve(true);
        }catch (e) {
            console.log(e)
            return Promise.resolve(false);
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