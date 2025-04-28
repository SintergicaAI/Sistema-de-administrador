import {FilteredValue} from "../common/CommonTypes.ts";

export interface CardData {
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
