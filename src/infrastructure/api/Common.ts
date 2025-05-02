import {AuthApi} from "./AuthApi.ts";

export class Common {
    protected readonly baseUrl: string = import.meta.env.VITE_LOCAL_TEST;
    protected authApi: AuthApi;

    constructor() {
        this.authApi = new AuthApi();
    }
    protected async refreshToke() {
        return this.authApi.getNewToken(this.authApi.getRefreshToken() as string)
    }
}