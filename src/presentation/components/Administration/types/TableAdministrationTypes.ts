import {UserDTO} from "../../../../infrastructure/api/types/CompanyResponse.ts";

interface DataType extends UserDTO{
    fullName: string;
    role: string;
    key: string;
    groups: string[];
}

export type{DataType}