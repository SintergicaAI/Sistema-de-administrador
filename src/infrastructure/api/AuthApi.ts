import {AuthRepository, UserToken} from '../../domain/repositories/AuthRepository';
import {User} from "../../domain/entities/User.ts";
import {AuthenticateApiResponse, LoginApiResponse} from "./types/AuthApiResponse.ts";

/*const BASE_URL = import.meta.env.VITE_API_URL;*/

export class AuthApi implements AuthRepository {
    private readonly baseUrl = "http://localhost:80";

    private getUserFromStorage(): { user: Partial<User> | null, token: string | null } {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            return {user: null, token: null};
        }
       /* console.log(JSON.parse(storedUser));*/
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

    async logIn(email: string, password: string): Promise<UserToken> {
        const response = await fetch(`${this.baseUrl}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            return Promise.reject(response);
        }

        const {token,refreshToken}: LoginApiResponse = await response.json();
        return {token,refreshToken};
    }


    //Que le debe responder el servidor aqui?
    async logOut(): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/clients/logout`)
        if (!response.ok) {
            throw new Error('Error en la petición')
        }
        return this.deleteToken()
    }

    deleteToken(): boolean {
        localStorage.removeItem('user');
        return !this.getUserFromStorage().token;

    }

    saveToken(token: UserToken): void {
        localStorage.setItem('user', JSON.stringify(token));
    }

    async register(firstname: string, lastname: string, email: string, password: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:firstname, lastName:lastname,email,password,rol:null,company:null}),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }


        const data: AuthenticateApiResponse = await response.json();
        return new User(data.id, data.email, data.role, undefined, undefined, undefined, undefined,data.token);
    }
}