import {UserDeleted} from "../types/UserDTO.ts";
import {User} from "../entities/User.ts";

export interface CompanyRepository {
    deleteUser(email:string):Promise<UserDeleted>;
    findUsersInCompany(searchParams: UserSearchParams): Promise<UserList>;
    getCompanyGroups():Promise<string[]>;
    addNewUserToCompany(email:string):Promise<boolean>;
}

export interface UserSearchParams {
    query: string ;  // Puede ser nombre, email, etc.
    page?: number;
    size?: number;
    groups?: string;

}

export interface UserList {
    users: User[];
    total: number;
}