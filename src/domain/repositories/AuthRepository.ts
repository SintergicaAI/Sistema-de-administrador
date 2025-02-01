export interface AuthRepository {
    isAuthenticated(): Promise<boolean>;
}