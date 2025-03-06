import {UserDeleted} from "../types/UserDTO.ts";
import {User} from "../entities/User.ts";

export interface CompanyRepository {
    deleteUser(email:string):Promise<UserDeleted>;
    findUsersInCompany(searchParams: UserSearchParams): Promise<UserList>;
    getCompanyGroups():Promise<string[]>
}

export interface UserSearchParams {
    query: string ;  // Puede ser nombre, email, etc.
    page?: number;
    limit?: number;
    groups?: string;

}

export interface UserList {
    users: User[];
    total: number;
}