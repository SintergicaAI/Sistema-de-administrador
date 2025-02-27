import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";
import {UserDeleted} from "../../domain/types/UserDTO.ts";

export class DeleteUser {
    constructor(private user:CompanyRepository) {}

    async execute(email: string): Promise<UserDeleted> {
        return await this.user.deleteUser(email);
    }
}