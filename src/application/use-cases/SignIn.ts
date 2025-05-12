import {AuthRepository, UserToken} from "../../domain/repositories/AuthRepository.ts";

//Este caso de uso es necesario? Implementa en su funcion execute la misma logica
export class SignIn {
    constructor(private authRepository: AuthRepository) {
    }
     async execute(firstname:string, lastname:string, email:string , password:string, sigInToken?:string):Promise<UserToken>{
        const user =  await this.authRepository.register(firstname,lastname,email,password,sigInToken);
         if(user) {
             this.authRepository.saveToken(user);
         }
         return user;

     }
}