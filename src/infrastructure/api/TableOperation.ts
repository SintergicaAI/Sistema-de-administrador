import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";
import {AdministrationApiResponse} from "./types/TableApiResponse.ts";

const BASE_URL = import.meta.env.BASE_URL;
const LOCAL_TEST = 'http://localhost:3001';

export class TableOperation implements TableOperationRepository  {

    async getAllUsersFromCampany(page:number,size:number): Promise<any[]> {
        const response = await fetch(`${LOCAL_TEST}/users`, {});
            //fetch(`${BASE_URL}/clients/getEmployeeGroupsForCompany?$page=${page}&size=${size}`)

        if(!response.ok){
            throw new Error('Error en la solicitud de datos');
        }
        const data = await response.json();
         return data.map((user:AdministrationApiResponse) => (
             {...user, key:user.id,name:`${user.first_name} ${user.last_name}`}));
    }

}