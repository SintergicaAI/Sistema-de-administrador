

/*http://localhost:3000/users?_page=1&_per_page=5*/


import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository.ts";
import {UserDeleted} from "../../domain/types/UserDTO.ts";
import { User } from "../../domain/entities/User";
import {AuthApi} from "./AuthApi.ts";

type UserData = {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: string;
    groups: string[];
    company:string;
}

export class LocalOperation  implements CompanyRepository {
    private readonly baseUrl = import.meta.env.VITE_LOCAL_TEST;
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
            query: searchParams.query,
            _page: searchParams.page?.toString() || '1',
            _per_page: searchParams.limit?.toString() || '10',
            ...(searchParams.groups && { groups: searchParams.groups })
        });

        //Comprobar si es necesario el query
        if((queryParams.get("query") as string).length === 0) queryParams.delete("query");

        const response = await fetch(
            /* `${this.baseUrl}/company/users?${queryParams}`*/
            `${this.baseUrl}/users?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    /*'Authorization': `Bearer ${token}`,*/
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error('Error al buscar usuarios en la compañía');
        }

        const {data,items} = await response.json();
        return {users:data.map((userData: UserData) => new User(
            userData.id,
            userData.email,
            userData.role,
            userData.first_name,
            userData.last_name,
            userData.company,
                userData.groups

        )),total:items};
    }

    async getCompanyGroups(): Promise<string[]> {
        const response = await fetch(`${this.baseUrl}/groups`,{});

        if(!response.ok) {
            return Promise.reject(response.statusText);
        }
        const data:string[] = await response.json();

        return Promise.resolve(data);
    }

}