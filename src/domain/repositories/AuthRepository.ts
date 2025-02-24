import {User} from "../entities/User.ts";

export interface AuthRepository {
    isAuthenticated(): Promise<boolean>;
    logIn(username: string, password: string): Promise<string>;
    logOut(): Promise<boolean>;
    saveToken(token: string): void;
    getToken(): string | null;
    register(firstname:string, lastname:string, email:string , password:string ): Promise<User>;
}