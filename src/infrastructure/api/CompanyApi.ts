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

    constructor() {
        this.authApi = new AuthApi();
    }

    async deleteUser(email: string): Promise<UserDeleted> {
        const response = await fetch("",{
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

    async findUsersInCompany(searchParams: UserSearchParams): Promise<UserList> {

        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }
        const queryParams = new URLSearchParams({
            fullname: searchParams.query,
            page: searchParams.page?.toString() || '0',
            size: searchParams.size?.toString() || '10',
            ...(searchParams.groups && { groups: searchParams.groups })
        });

        //Comprobar si es necesario el query
        if((queryParams.get("fullname") as string).length === 0) queryParams.delete("fullname");

        const response = await fetch(
            `${this.baseUrl}/company/users?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        //TODO:Cambiarlo por 401
        if (response.status === 403) {
            this.authApi.getNewToken(this.authApi.getRefreshToken() as string)
                .then(r => console.log(`Se actualizo el token ${r}`))
                .catch((err: Error) => {
                    console.log(err)
                });
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

        const response = await fetch(`${this.baseUrl}/company/groups`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        //Refrescar el token
        if(response.status === 403) {
            this.authApi.getNewToken(this.authApi.getRefreshToken() as string)
                .then(r => console.log(`Se actualizo el token ${r}`))
                .catch((err: Error) => {
                    console.log(err)
                });
        }
        const data = await response.json();
        return data.map((element:GroupItem) => element?.name.toLowerCase());
    }

}