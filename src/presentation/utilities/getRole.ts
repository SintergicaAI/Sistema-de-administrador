import {UserRole} from "../../domain/enums/UserRole.ts";

export function getRole(role:string) {
    if (!role) return "Usuario";

    switch (role) {
        case 'OWNER':
            return UserRole.OWNER;
        case 'ADMIN':
            return UserRole.ADMIN;
        default:
            return 'Usuario';
    }
}