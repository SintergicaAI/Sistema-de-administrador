import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";

export class LogIn {
    constructor(private authRepository: AuthRepository) {
    }

    async execute(username: string, password: string): Promise<boolean> {
        const token = await this.authRepository.logIn(username, password);
        if(token) {
            this.authRepository.saveToken(token);
        }
        return true;
    }
}