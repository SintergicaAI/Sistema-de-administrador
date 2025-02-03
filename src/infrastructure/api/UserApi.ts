import {UserRepository} from "../../domain/repositories/UserRepository.ts";
import {User} from "../../domain/entities/User.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

export class UserApi implements UserRepository {
    private readonly baseUrl = BASE_URL;
    async getUserById(id: string): Promise<User> {
        const response = await fetch(`${this.baseUrl}/users/${id}`);
        const data = await response.json();
        return new User(data.id, data.email, data.role, data.first_name, data.last_name, data.password);
    }

    async getAllUsers(): Promise<User[]> {
        const response = await fetch(`${this.baseUrl}/users`);
        const data = await response.json();
        return data.map((user: { id: string; name: string; last_name: string; password: string; email: string; role: string; }) => new User(user.id, user.email, user.role, user.name, user.last_name, user.password));
    }
}