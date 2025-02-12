import {UserRole} from "../enums/UserRole.ts";

export class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly role: string = UserRole.USER,
        public readonly firstName?: string,
        public readonly lastName?: string,
        public readonly password?: string,
        public token?: string,
    ) {
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get isAdmin(): boolean {
        return this.role === UserRole.ADMIN;
    }
}
