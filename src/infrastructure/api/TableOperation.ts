import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";
import { v4 as uuid } from 'uuid'
import {UserDTO} from "./types/CompanyResponse.ts";
import {AuthApi} from "./AuthApi.ts";
import {PaginableResponse, UsersCompanyPagination} from "./types/PaginableResponse.ts";

/*http://localhost:3000/users?_page=1&_per_page=5*/
const BASE_URL = import.meta.env.VITE_API_URL;
//const LOCAL_TEST = 'http://localhost:3000';

export class TableOperation implements TableOperationRepository  {

    private url = `${BASE_URL}`;
    authApi = new AuthApi();


    async getAllUsersFromCampany(page:number,size:number): Promise<any[]> {
        const response =
            await fetch(`${this.url}/clients/getEmployeeGroups?page=${page}&size=${size}`,{
                headers:{
                    Authorization:`Bearer ${this.authApi.getToken()}`
                }
            })

        if(!response.ok){
            console.log(response);
            throw new Error('Error en la solicitud de datos');
        }
        const userPagination:UsersCompanyPagination = await response.json();
        const {userDTOPage,totalElements} = userPagination;

        return [userDTOPage,totalElements];
    }



}