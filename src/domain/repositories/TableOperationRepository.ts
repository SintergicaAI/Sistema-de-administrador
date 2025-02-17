
//TODO:Cambiar any por el formato de respuesta del backend

export interface TableOperationRepository {
    getAllUsersFromCampany(page:number,size:number):Promise<any[]>;
}