import {User} from "../entities/User.ts";

export interface AuthRepository {
    isAuthenticated(): Promise<boolean>;
    logIn(username: string, password: string): Promise<User>;
    logOut(): Promise<boolean>;
    saveToken(user: User): void;
    getToken(): string | null;
}