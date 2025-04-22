import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";

export class VerifySigInToken {
    constructor(private authApi: AuthRepository) {}

    async execute(email:string, token:string):Promise<boolean> {
        return await this.authApi.verifySigInToken(email, token);
    }
}