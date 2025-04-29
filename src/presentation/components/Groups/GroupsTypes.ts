import {FilteredValue} from "../common/CommonTypes.ts";

export interface CardData extends FilteredValue{
    nameGroup: string,
    userCreatorName: string,
    members: number,
    size:number
}
export type SideContentType = 'conocimiento' | 'asistentes' | 'usuarios' | '';

export interface Tags extends FilteredValue {
    text:string,
    value:string,
    color:string,
}
export interface Model extends FilteredValue {
    id:string,
    title:string,
    iconUrl:string,
    text:string,
    value:string
}
