import {AuthRepository} from '../../domain/repositories/AuthRepository';
import {User} from "../../domain/entities/User.ts";
import {AuthenticateApiResponse} from "./types/AuthApiResponse.ts";

const BASE_URL = import.meta.env.VITE_TURING_API_URL;

export class AuthApi implements AuthRepository {
    private readonly baseUrl = BASE_URL;

    private getUserFromStorage(): { user: Partial<User> | null, token: string | null } {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            return {user: null, token: null};
        }
        return JSON.parse(storedUser);
    }

    async isAuthenticated(): Promise<boolean> {
        const {token} = this.getUserFromStorage();
        return !!token;
    }

    getToken(): string | null {
        const {token} = this.getUserFromStorage();
        return token;
    }

    async logIn(email: string, password: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/auths/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }

        const data: AuthenticateApiResponse = await response.json();
        return new User(data.id, data.email, data.role, data.name, undefined, undefined, data.token);
    }

    saveToken(user: User): void {
        localStorage.setItem('user', JSON.stringify({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            token: user.token,
        }));
    }

    //TODO FINISH IMPLEMENTATION
    logOut(): Promise<boolean> {
        return Promise.resolve(false);
    }
}