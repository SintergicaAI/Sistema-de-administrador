import {UserDTO} from "./CompanyResponse.ts";

export interface PaginableResponse {
    currentPage: number,
    totalPages: number,
    totalElements: number;
}
export interface UsersCompanyPagination extends PaginableResponse {
    userDTOPage:UserDTO[]
}