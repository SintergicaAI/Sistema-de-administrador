import {FilteredValue} from "../common/CommonTypes.ts";

export interface CardData extends FilteredValue{
    groupId:string;
    nameGroup: string,
    userCreatorName: string,
    members: number,
    size:number
}
export type SideContentType = 'conocimiento' | 'asistentes' | 'usuarios' | '';

export interface AvatarUserInfo extends FilteredValue {
    email:string,
    lastName:string,
    firstName:string,
    role:string,
}
export interface Tags extends FilteredValue {
    text:string,
    value:string,
    color:string,
}
export interface Model extends FilteredValue {
    id:string,
    title:string,
    colorIcon:string,
    text:string,
    value:string
}
