export class User {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly lastName: string,
        public readonly password: string,
        public readonly email: string,
        public readonly role: string,
    ) {
    }

    get fullName(): string {
        return `${this.name} ${this.lastName}`;
    }
}
