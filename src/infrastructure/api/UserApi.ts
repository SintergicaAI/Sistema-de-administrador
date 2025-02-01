import {UserRepository} from "../../domain/repositories/UserRepository.ts";
import {User} from "../../domain/entities/User.ts";

export class UserApi implements UserRepository {
    private readonly baseUrl = "http://localhost:3000";
    async getUserById(id: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/${id}`);
        const data = await response.json();
        return new User(data.id, data.first_name, data.last_name, data.password, data.email, data.role);
    }

    async getAllUsers(): Promise<User[]> {
        const response = await fetch(`${this.baseUrl}/users`);
        const data = await response.json();
        return data.map((user: { id: string; name: string; last_name: string; password: string; email: string; role: string; }) => new User(user.id, user.name, user.last_name, user.password, user.email, user.role));
    }
}