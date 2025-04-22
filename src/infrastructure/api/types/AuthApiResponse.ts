import {UserRole} from "../../../domain/enums/UserRole.ts";

//Archivo que contiene las diferentes respuestas
export interface LoginApiResponse {
    token: string;
    refreshToken:string;
}

export interface AuthenticateApiResponse {
    id: string;
    email: string;
    role: UserRole;
    token: string;
    refreshToken: string;
    name: string;
}

export interface  ErrorApiResponse {
    error: string;
    data: string;
}

//Pending refactoring :
export interface RegisterApiResponse {
    id:string,
    token: string;
    exitoso:boolean
}

export interface LogoutApiResponse {

}

export interface RefreshTokenApiResponse {

}

export interface ForgotPasswordApiResponse {

}

export interface ResetPasswordApiResponse {

}
//end pending refactoring
