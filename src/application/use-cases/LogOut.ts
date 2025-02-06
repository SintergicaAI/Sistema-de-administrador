import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";

export class LogOut {
    constructor(private authRepository: AuthRepository) {
    }

    async execute(): Promise<boolean> {
         return await this.authRepository.logOut();
    }
}