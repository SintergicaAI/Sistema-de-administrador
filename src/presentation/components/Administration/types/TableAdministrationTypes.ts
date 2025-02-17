import {UserRole} from "../../../../domain/enums/UserRole.ts";

interface DataType {
    key:string;
    name:string;
    id: number;
    email: string;
    groups: number|{};
    rol: UserRole.USER | UserRole.ADMIN | UserRole.OWNER;
}
type DataIndex = keyof DataType;

export type{DataType,DataIndex}