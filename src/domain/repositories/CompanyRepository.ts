import {UserDeleted, UserList, UserSearchParams} from "../types/CompanyTypes.ts";
export interface CompanyRepository {
    deleteUser(email:string):Promise<UserDeleted>;
    findUsersInCompany(searchParams: UserSearchParams | {}): Promise<UserList>;
    addUserToGroupCompany(email:string, group:string[]):Promise<boolean>;
    changeUserRoleFromCompany(email:string, role:string):Promise<boolean>;
}