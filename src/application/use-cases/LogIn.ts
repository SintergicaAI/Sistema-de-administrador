import {AuthRepository, UserToken} from "../../domain/repositories/AuthRepository.ts";

export class LogIn {
    constructor(private authRepository: AuthRepository) {
    }

    async execute(email: string, password: string): Promise<UserToken> {
        const response = await this.authRepository.logIn(email, password);
        if(response) {
            this.authRepository.saveToken(response);
        }
        return response;
    }
}