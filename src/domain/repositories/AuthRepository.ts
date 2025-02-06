import {User} from "../entities/User.ts";
import {UserRole} from "../enums/UserRole.ts";

export interface AuthRepository {
    isAuthenticated(): Promise<boolean>;
    logIn(username: string, password: string): Promise<User>;
    logOut(): Promise<boolean>;
    saveToken(user: User): void;
    getToken(): string | null;
    register(firstname:string, lastname:string, email:string , password:string, rol:UserRole ): Promise<User>;
}