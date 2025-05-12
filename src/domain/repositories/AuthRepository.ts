export type UserToken = {
    token:string;
    refreshToken:string
}

export interface AuthRepository {
    isAuthenticated(): Promise<boolean>;
    getNewToken(refreshToken:string): Promise<boolean>;
    getRefreshToken():string;
    logIn(username: string, password: string): Promise<UserToken>;
    logOut(): Promise<boolean>;
    saveToken(token: UserToken): void;
    getToken(): string | null;
    register(firstname:string, lastname:string, email:string , password:string, sigInToken?:string ): Promise<UserToken>;
    verifySigInToken(email:string, token:string): Promise<boolean>;
    forgotPassword(email:string):Promise<boolean>;
    changePassword(password:string, token:string):Promise<boolean>;
}