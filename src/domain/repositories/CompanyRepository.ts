import {GroupType, UserDeleted} from "../types/CompanyTypes.ts";
import {User} from "../entities/User.ts";
import {InvitateUserDTO} from "../types/CompanyTypes.ts";
import { CompanyType } from '../types/CompanyTypes';

export interface CompanyRepository {
    deleteUser(email:string):Promise<UserDeleted>;
    findUsersInCompany(searchParams: UserSearchParams | {}): Promise<UserList>;
    getCompanyGroups():Promise<GroupType[]>;
    addNewUserToCompany(email:string):Promise<boolean>;
    addUserToGroupCompany(email:string, group:string[]):Promise<boolean>;
    changeUserRoleFromCompany(email:string, role:string):Promise<boolean>;
    getInvitedUsers():Promise<InvitateUserDTO[]>;
    addNewCompany(company: CompanyType): Promise<CompanyType>;
    getAllCompanies(): Promise<CompanyType[]>;
    deleteCompany(companyId: string): Promise<boolean>;
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


