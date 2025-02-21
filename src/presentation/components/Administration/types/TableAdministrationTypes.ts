import {AdministrationApiResponse} from "../../../../infrastructure/api/types/TableApiResponse.ts";

interface DataType extends AdministrationApiResponse{
    key:string;
    role: string;
}

export type{DataType}