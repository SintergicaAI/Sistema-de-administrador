// application/usecases/FindUserInCompany.ts
import {CompanyRepository, UserList, UserSearchParams} from "../../domain/repositories/CompanyRepository";

export class FindUserInCompany {
    constructor(private companyRepository: CompanyRepository) {}

    async execute(searchParams: UserSearchParams): Promise<UserList> {
        try {
            return await this.companyRepository.findUsersInCompany(
                searchParams
            );
        } catch (error:unknown) {
            throw new Error(`Error al buscar usuarios: ${error}`);
        }
    }
}