import {AuthRepository} from '../../domain/repositories/AuthRepository';
import {User} from "../../domain/entities/User.ts";
import {LoginApiResponse} from "./types/AuthApiResponse.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

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
        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }

        //TODO: Replace test token. Added because json-server limitations
        const data: LoginApiResponse = await response.json();
        return new User(data.id, data.email, data.role, undefined, undefined, undefined, 'abcdtestoken');
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
}