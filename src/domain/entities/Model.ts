import {User} from "./User.ts";

export class Model {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly image: string,
        public readonly author: User,
        public readonly isActive: boolean) {
    }
}