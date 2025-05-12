import {AuthRepository, UserToken} from '../../domain/repositories/AuthRepository';
import {AuthenticateApiResponse, ErrorApiResponse, LoginApiResponse} from "./types/AuthApiResponse.ts";

/*const BASE_URL = import.meta.env.VITE_API_URL;*/

export class AuthApi implements AuthRepository {
    private readonly baseUrl = "http://localhost:80";

    private getUserFromStorage(): LoginApiResponse {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            return {refreshToken:'',token:''};
        }
       /* console.log(JSON.parse(storedUser));*/
        return JSON.parse(storedUser);
    }

    async isAuthenticated(): Promise<boolean> {
        //llame el endpoint de refreshToken
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


    async logOut(): Promise<boolean> {
        const response = await fetch(`${this.baseUrl}/users/logout`,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.getRefreshToken()}`,
            }
        })
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

    async register(firstname: string, lastname: string, email: string, password: string, sigInToken?:string ): Promise<UserToken> {

        const url = sigInToken ?
            `${this.baseUrl}/users/register?signInToken=${sigInToken}`: `${this.baseUrl}/users/register`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name:firstname, lastName:lastname,email:email,password:password}),
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }


        const {token,refreshToken}: AuthenticateApiResponse = await response.json();
        return {token,refreshToken};
    }

    async getNewToken(userRefreshToken: string){
        //llamada a la API
        const response = await fetch(`${this.baseUrl}/users/refreshToken`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userRefreshToken}`,
            }
        })
        if (!response.ok){
            return Promise.reject(response.json());
        }
        const {token,refreshToken}: LoginApiResponse = await response.json();
        //Guardar el nuevo token
        this.saveToken({token,refreshToken});
        return true;
    }

     getRefreshToken(): string  {
        const {refreshToken} = this.getUserFromStorage();
        return refreshToken;
    }

    //TODO:CHANGE BODY OF THE JSON
    async verifySigInToken(email: string, token: string): Promise<boolean> {
        try{
            const response = await fetch(`${this.baseUrl}/invitation/validate`,{
                method: 'POST',
                body:JSON.stringify({email:email, token:token}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
               return Promise.reject(response);
            }

        return true;
        }catch (e) {
            return Promise.reject(false);
        }
    }

    async forgotPassword(email: string): Promise<boolean> {
        try{
            const response = await fetch(`${this.baseUrl}/users/forgot-password`,{
                method: 'POST',
                body:JSON.stringify({email:email}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                const info:ErrorApiResponse = await response.json();
                return Promise.reject(info);
            }

            return Promise.resolve(true);
        }catch (e) {
            return Promise.reject(false);
        }
    }

    async changePassword(password: string, token:string): Promise<boolean> {
        try{
            const response = await fetch(`${this.baseUrl}/users/change-password`,{
                method: 'PATCH',
                body:JSON.stringify({password:password, token:token}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            if (!response.ok) {
                const info:ErrorApiResponse = await response.json();
                return Promise.reject(info);
            }

            return Promise.resolve(true);
        }catch (e) {
            return Promise.reject(false);
        }

    }
}