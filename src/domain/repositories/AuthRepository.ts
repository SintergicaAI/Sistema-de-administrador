import {User} from "../entities/User.ts";

export type UserToken = {
    token:string;
    refreshToken:string
}

export interface AuthRepository {
    isAuthenticated(): Promise<boolean>;
    refreshToken(token:string): Promise<string>;
    logIn(username: string, password: string): Promise<UserToken>;
    logOut(): Promise<boolean>;
    saveToken(token: UserToken): void;
    getToken(): string | null;
    getRefreshToken(): string | null;
    register(firstname:string, lastname:string, email:string , password:string ): Promise<User>;
}