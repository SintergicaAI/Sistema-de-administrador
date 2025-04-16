import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";

export class ChangePassword {
    constructor(private authRepository: AuthRepository ) {
    }

    execute(newPassword: string): Promise<boolean> {
        return this.authRepository.changePassword(newPassword);
    }
}