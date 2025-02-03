import {UserRole} from "../../../domain/enums/UserRole.ts";

export interface LoginApiResponse {
    id: string;
    email: string;
    role: UserRole;
    token: string;
}

export interface RegisterApiResponse {

}

export interface LogoutApiResponse {

}

export interface RefreshTokenApiResponse {

}

export interface ForgotPasswordApiResponse {

}

export interface ResetPasswordApiResponse {

}
