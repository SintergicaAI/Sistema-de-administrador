import {CompanyRepository} from "../../domain/repositories/CompanyRepository.ts";
import {Company} from "../../domain/entities/Company.ts";

export class CreateCompanyUseCase {
    constructor(private readonly companyRepository: CompanyRepository) {}

    async execute(companyData: Omit<Company, 'id'>): Promise<Company> {
        try {
            return await this.companyRepository.addNewCompany(companyData);
        } catch (error) {
            console.error('Error creating company:', error);
            throw new Error('Error al crear la empresa');
        }
    }
}