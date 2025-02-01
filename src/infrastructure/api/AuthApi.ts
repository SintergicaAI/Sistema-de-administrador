import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class AuthApi implements AuthRepository {
    async isAuthenticated(): Promise<boolean> {
        const user = localStorage.getItem('user');
        let userParsed = {
            user: null,
            token: null
        };
        if (typeof user === "string") {
            userParsed = JSON.parse(user);
        }
        return !!userParsed.token;
    }
}