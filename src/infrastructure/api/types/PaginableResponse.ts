import {UserDTO} from "./CompanyResponse.ts";

export interface PaginableResponse {
    data:[],
    totalElements: number;
    currentPage?: number,
    totalPages?: number,
}
export interface UsersCompanyPagination extends PaginableResponse {
    userDTOPage:UserDTO[]
}