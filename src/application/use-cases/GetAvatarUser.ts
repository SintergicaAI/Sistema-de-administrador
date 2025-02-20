import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";

export class GetAvatarUser {
    constructor(private authRepository: AuthRepository) { }

    async logIn(username: string, password: string): Promise<User> {}
}