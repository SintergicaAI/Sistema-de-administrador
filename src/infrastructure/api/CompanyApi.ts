import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository.ts";
import {AuthApi} from "./AuthApi.ts";
import {UserDeleted} from "../../domain/types/UserDTO.ts";
import { User } from "../../domain/entities/User";


export class CompanyApi implements CompanyRepository {
    private readonly baseUrl = import.meta.env.DOCKER_API_URL;
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
            page: searchParams.page?.toString() || '0',
            size: searchParams.size?.toString() || '10',
            ...(searchParams.groups && { groups: searchParams.groups })
        });

        //Comprobar si es necesario el query
        if((queryParams.get("query") as string).length === 0) queryParams.delete("query");

        const response = await fetch(
            `http://localhost/company/users?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const {userDTOPage,totalElements} = await response.json();
        return {users:userDTOPage.map((userData: any) => new User(
                "",
                userData.email,
                userData.role,
                userData.name,
                userData.lastName,
                undefined,
                userData.groupDTOList,
                undefined

            )), total:totalElements}

    }

    async getCompanyGroups(): Promise<string[]> {
        const token = this.authApi.getToken();
        if (!token) {
            throw new Error('No autorizado');
        }

        const response = await fetch("http://localhost/company/groups",{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if(!response.ok) {
            throw new Error('No se encontraron los grupos');
        }
        const data = await response.json();
        return data.map((element) => element?.name.toLowerCase());
    }

}