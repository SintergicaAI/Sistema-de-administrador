import {UserDeleted} from "../types/CompanyTypes.ts";
import {User} from "../entities/User.ts";

export interface CompanyRepository {
    deleteUser(email:string):Promise<UserDeleted>;
    findUsersInCompany(searchParams: UserSearchParams | {}): Promise<UserList>;
    addNewUserToCompany(email:string):Promise<boolean>;
    addUserToGroupCompany(email:string, group:string[]):Promise<boolean>;
    changeUserRoleFromCompany(email:string, role:string):Promise<boolean>;
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