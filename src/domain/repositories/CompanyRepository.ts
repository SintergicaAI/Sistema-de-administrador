import {UserDeleted} from "../types/UserDTO.ts";

export interface CompanyRepository {
    deleteUser(email:string):Promise<UserDeleted>;
}