import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";
import {AdministrationApiResponse} from "./types/TableApiResponse.ts";
import { v4 as uuid } from 'uuid'

/*http://localhost:3000/users?_page=1&_per_page=5*/
const BASE_URL = import.meta.env.VITE_API_URL;
//const LOCAL_TEST = 'http://localhost:3000';

export class TableOperation implements TableOperationRepository  {

    private url = `${BASE_URL}`;
    async getAllUsersFromCampany(page:number,size:number): Promise<any[]> {
        const {token} = JSON.parse(localStorage.getItem('user') as string);
        const response =
            await fetch(`${this.url}/clients/getEmployeeGroups?page=${page}&size=${size}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

        if(!response.ok){
            console.log(response);
            throw new Error('Error en la solicitud de datos');
        }
        const {userDTOPage,totalElements} = await response.json();
         return [userDTOPage.map(
             (user:AdministrationApiResponse) =>
                 (
             {...user,
                 fullName:`${user.name} ${user.lastName}`,
                 role:'Usuario',
                 key: uuid(),
                 groups: [...user.groupDTOList.map(group => group.name.split(" ")[0])]

             }
                 )
         ),totalElements];
    }

}