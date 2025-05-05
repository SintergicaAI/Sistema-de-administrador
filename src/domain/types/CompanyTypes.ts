import {User} from "../entities/User.ts";

export interface UserDeleted {
    email:string;
}

export interface GroupBasicInfo {
    group_id:string;
    name:string;
}
export type RoleType = {
    id:string;
    name: string;
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
export type UserFromGroup = {
    "email": string,
    "name": string,
    "lastName": string,
    "rol": {
        "id": string,
        "name": string
    }
}


export interface GetGroupDTO{
    "group_id": string,
    "name": string,
    "userCreator": UserFromGroup,
    "creationDate": string,
    "editDate":string,
    "userDTOS": UserFromGroup[]
}

export interface InvitateUserDTO  {
    email: string,
    token: string,
    expireDate: string,
    group:null,
    active:boolean,
}
export interface ErrorGroup {
    "error": string,
    "date": string
}
