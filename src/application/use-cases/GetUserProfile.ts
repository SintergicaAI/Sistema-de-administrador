import {UserRepository} from "../../domain/repositories/UserRepository.ts";
import {User} from "../../domain/entities/User.ts";

export class GetUserProfile {
    constructor(private userRepository: UserRepository) {
    }

    async execute(id: string): Promise<User> {
        return await this.userRepository.getUserById(id);
    }
}