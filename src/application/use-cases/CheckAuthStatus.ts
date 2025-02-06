import { AuthRepository } from '../../domain/repositories/AuthRepository';

export class CheckAuthStatus {
    constructor(private authRepository: AuthRepository) {}

    async execute(): Promise<boolean> {
        return await this.authRepository.isAuthenticated();
    }
}