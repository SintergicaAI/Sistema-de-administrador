import {User} from "../entities/User.ts";

export interface UserRepository {
    getUserById(id: string): Promise<User>;
    getAllUsers(): Promise<User[]>;
}