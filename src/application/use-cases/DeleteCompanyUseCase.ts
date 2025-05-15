import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";

export class DeleteCompanyUseCase {
    constructor(private readonly companyRepository: CompanyRepository) {}

    async execute(companyId: string): Promise<boolean> {
        try {
            return await this.companyRepository.deleteCompany(companyId);
        } catch (error) {
            console.error('Error deleting company:', error);
            throw new Error('Error al eliminar la empresa');
        }
    }
}