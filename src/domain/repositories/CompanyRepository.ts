import {UserDeleted} from "../types/UserDTO.ts";
import {User} from "../entities/User.ts";
import {UsersCompanyPagination} from "../../infrastructure/api/types/PaginableResponse.ts";

export interface CompanyRepository {
    deleteUser(email:string):Promise<UserDeleted>;
    findUsersInCompany(searchParams: UserSearchParams): Promise<UsersCompanyPagination>;
}

export interface UserSearchParams {
    query: string;  // Puede ser nombre, email, etc.
    page?: number;
    limit?: number;
    role?: string;
}

export interface UserList {
    users: User[];
    total: number;
}