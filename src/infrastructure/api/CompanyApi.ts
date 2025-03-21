import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository.ts";
import {AuthApi} from "./AuthApi.ts";
import {UserDeleted} from "../../domain/types/UserDTO.ts";
import { User } from "../../domain/entities/User";
import {PaginableResponse} from "./types/PaginableResponse.ts";

type GroupItem = {
    index:string;
    name: string;
}


export class CompanyApi implements CompanyRepository {
    private readonly baseUrl = `http://localhost`;
    private authApi: AuthApi;
    private cacheGroups: GroupItem[] = [];

    constructor() {
        this.authApi = new AuthApi();
    }
    private refreshToke() {
        this.authApi.getNewToken(this.authApi.getRefreshToken() as string)
            .then(r => console.log(`Se actualizo el token ${r}`))
            .catch((err: Error) => {
                console.log(err)
            });
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

        if(Object.keys(searchParams).length > 0){
             queryParams = new URLSearchParams({
                page: searchParams.page?.toString() || '',
                size: searchParams.size?.toString() || '',
                groups:searchParams.groups || '',
                fullname: searchParams.query
            });
            //Comprobar si es necesario el query y groups
            if((queryParams.get("fullname") as string).length === 0) queryParams.delete("fullname");
            if((queryParams.get("groups") as string).length === 0) queryParams.delete("groups");
        }
        let response:Response;
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
            this.refreshToke();
            this.findUsersInCompany({});
        }
        const {data,totalElements}:PaginableResponse = await response.json();
        return {users:data.map((userData: any) => new User(
                "",
                userData.email,
                userData.role,
                userData.name,
                userData.lastName,
                undefined,
                userData.groups,
                undefined

            )), total:totalElements}

    }



    async getCompanyGroups(): Promise<string[]> {
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
                this.refreshToke()
            }
            const data = await response.json();
            this.cacheGroups = [...data];
            return data.map((element:GroupItem) => element?.name.toLowerCase());
        }
        return this.cacheGroups.map((element:GroupItem) => element?.name.toLowerCase());

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
                this.refreshToke()
            }

            return true;
        }catch (e) {
            console.log(e)
            return false
        }
    }

}