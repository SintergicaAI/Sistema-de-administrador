//Structure of Api responses for Administration and future page with tables
import {UserRole} from "../../../domain/enums/UserRole.ts";

interface AdministrationApiResponse{
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    groups: number|{};
    rol: UserRole.USER | UserRole.ADMIN | UserRole.OWNER;
}
export type {AdministrationApiResponse}