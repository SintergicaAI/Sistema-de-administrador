import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository.ts";
import {AuthApi} from "./AuthApi.ts";
import {UserDeleted} from "../../domain/types/CompanyTypes.ts";
import { User } from "../../domain/entities/User";
import {PaginableResponse} from "./types/PaginableResponse.ts";
import {UserRole} from "../../domain/enums/UserRole.ts";
import {GroupType, RoleItem} from "../../domain/types/CompanyTypes.ts";


export class CompanyApi implements CompanyRepository {
    private readonly baseUrl = `http://localhost`;
    private authApi: AuthApi;
    private cacheGroups: GroupType[] = [];

    constructor() {
        this.authApi = new AuthApi();
    }
    private async refreshToke() {
        return this.authApi.getNewToken(this.authApi.getRefreshToken() as string)
    }

    private getRole(role:RoleItem) {
        switch (role.name) {
            case 'ADMIN':
                return UserRole.ADMIN;
            case 'USER':
                return UserRole.USER;
            default:
                return 'Dueño';
        }
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
            await this.findUsersInCompany({});
        }
        const {data,totalElements}:PaginableResponse = await response.json();
        return {users:data.map((userData: any) => new User(
                "",
                userData.email,
                this.getRole(userData.role),
                userData.name,
                userData.lastName,
                undefined,
                userData.groups,
                undefined

            )), total:totalElements}

    }



    async getCompanyGroups(): Promise<GroupType[]> {
        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }

        if(!this.cacheGroups.length){
            const response = await fetch(`${this.baseUrl}/company/groups`,{
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            //Refrescar el token
            if(response.status === 403) {
                await this.refreshToke()
            }
            const data:GroupType[] = await response.json();
            this.cacheGroups = [...data];
            return data;
        }
        return this.cacheGroups;
    }

    async addNewUserToCompany(email:string): Promise<boolean> {
        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }
        try{
            const response = await fetch(`${this.baseUrl}/company/users/${email}`,{
                method: 'POST',
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

    deleterUserFromCompany(group: string, email: string): Promise<boolean> {


        return Promise.resolve(false);
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

}