import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";

export class GetNewTokenResponse{

    constructor(private authRepository:AuthRepository) {}

    async execute(userToken:string):Promise<boolean> {
        return this.authRepository.getNewToken(userToken);
    }
}