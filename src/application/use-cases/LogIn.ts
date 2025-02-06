import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";
import {User} from "../../domain/entities/User.ts";

export class LogIn {
    constructor(private authRepository: AuthRepository) {
    }

    async execute(username: string, password: string): Promise<User> {
        const user = await this.authRepository.logIn(username, password);
        if(user) {
            this.authRepository.saveToken(user);
        }
        return user;
    }
}