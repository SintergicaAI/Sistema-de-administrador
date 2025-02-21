import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";
import {AdministrationApiResponse} from "./types/TableApiResponse.ts";

/*http://localhost:3000/users?_page=1&_per_page=5*/
const BASE_URL = import.meta.env.VITE_API_URL;
//const LOCAL_TEST = 'http://localhost:3000';

export class TableOperation implements TableOperationRepository  {

    private url = `${BASE_URL}`;
    async getAllUsersFromCampany(page:number,size:number): Promise<any[]> {
        const response =
            await fetch(`${this.url}/clients/getEmployeeGroups?page=${page}&size=${size}`)
        //await fetch(`${LOCAL_TEST}/users?_page=${page}&_per_page=${size}`, {})
        //await fetch(`${LOCAL_TEST}/users`, {});


        if(!response.ok){
            throw new Error('Error en la solicitud de datos');
        }
        const {userDTOPage,totalPages} = await response.json();
         return [userDTOPage.map(
             (user:AdministrationApiResponse) =>
                 (
             {...user,
                 fullName:`${user.name} ${user.lastName}`,
                 role:'Usuario'
             }
                 )),totalPages];
    }

}