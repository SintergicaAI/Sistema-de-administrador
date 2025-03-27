import {GroupType} from "../../../domain/types/CompanyTypes.ts";


export interface UserDTO{
    id:string;
    name:string;
    lastName:string;
    email:string;
    groups:GroupType[];

}
