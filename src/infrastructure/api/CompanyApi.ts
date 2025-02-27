import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository.ts";
import {AuthApi} from "./AuthApi.ts";
import {UserDeleted} from "../../domain/types/UserDTO.ts";
import { User } from "../../domain/entities/User";


export class CompanyApi implements CompanyRepository {
    private readonly baseUrl = import.meta.env.VITE_API_URL;
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
            page: searchParams.page?.toString() || '1',
            limit: searchParams.limit?.toString() || '10',
            ...(searchParams.role && { role: searchParams.role })
        });

        const response = await fetch(
            `${this.baseUrl}/companies/users?${queryParams}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error('Error al buscar usuarios en la compañía');
        }

        const data = await response.json();
        return data.users.map((userData: any) => new User(
            userData.id,
            userData.email,
            userData.role,
            userData.firstname,
            userData.lastname,
            userData.company,
            undefined
        ));
    }

}