import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";

export class ForgotPassword {
    constructor(private authRepository: AuthRepository) {}

    async execute(password:string): Promise<boolean> {
        return await this.authRepository.forgotPassword(password);
    }
}