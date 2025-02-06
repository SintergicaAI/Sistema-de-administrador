import {AuthRepository} from "../../domain/repositories/AuthRepository.ts";
import {UserRole} from "../../domain/enums/UserRole.ts";
import {User} from "../../domain/entities/User.ts";

//Este caso de uso es necesario? Implementa en su funcion execute la misma logica
export class SignIn {
    constructor(private authRepository: AuthRepository) {
    }
     async execute(firstname:string, lastname:string, email:string , password:string):Promise<User>{
        const user =  await this.authRepository.register(firstname,lastname,email,password);
         if(user) {
             this.authRepository.saveToken(user);
         }
         return user;

     }
}