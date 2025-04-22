

export interface TableOperationRepository {
    //TODO:Generar un type de la respuesta del getAllUsersCompany
    getAllUsersFromCampany(page:number,size:number):Promise<any[]>;
}