export interface UserDeleted {
    email:string;
}

export type GroupType = {
    group_id:string;
    name:string;
}
export type RoleType = {
    id:string;
    name: string;
}
type UserFromGroup = {
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
    "users": UserFromGroup[]
}

export interface InvitateUserDTO  {
    email: string,
    token: string,
    expireDate: string,
    group:null,
    active:boolean,
}

export interface CompanyType {
    id?: string;
    name: string;
    rfc: string;
    address: string;
}
