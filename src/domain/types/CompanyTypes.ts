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
export interface InvitateUserDTO  {
    email: string,
    token: string,
    expireDate: string,
    group:null,
    active:boolean,
}