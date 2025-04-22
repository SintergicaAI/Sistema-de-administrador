import { User } from "../../../../domain/entities/User.ts";


interface DataType extends User{
    fullName: string;
    key: string;
}

export type{DataType}