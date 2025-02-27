import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";
import {AuthApi} from "./AuthApi.ts";
import {UsersCompanyPagination} from "./types/PaginableResponse.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

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