import {User} from "../entities/User.ts";

export interface AuthRepository {
    isAuthenticated(): Promise<boolean>;
    logIn(username: string, password: string): Promise<User>;
    saveToken(user: User): void;
    getToken(): string | null;
}