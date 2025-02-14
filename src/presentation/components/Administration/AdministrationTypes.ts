import {UserRole} from "../../../domain/enums/UserRole.ts";

type userSelected = {
    email: string;
    first_name: string;
    last_name: string;
    groups: number|{};
    key: string;
    rol: UserRole.USER | UserRole.ADMIN | UserRole.OWNER;
}
export type{userSelected}