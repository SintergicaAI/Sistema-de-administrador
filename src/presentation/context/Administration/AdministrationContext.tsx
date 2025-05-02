import {createContext} from "react";
import {DataType} from "../../components/Administration/types/TableAdministrationTypes.ts";
import {User} from "../../../domain/entities/User.ts";
import {GroupBasicInfo} from "../../../domain/types/CompanyTypes.ts";

export type RowSelectedType = {
    email:string,
    firstName:string,
    lastName:string,
    fullName:string,
    key:string,
    id:string,
    role:"Usuario"| "Administrador"| "Dueño",
    groups:GroupBasicInfo[],

}

export type valueAdministrationContext = {
    changeSelectedRow:(newRowSelected:RowSelectedType)=>void,
    changeHasSelected:(newHasSelected:boolean)=>void,
    selectedRow:RowSelectedType,
    hasSelected:boolean,
    dataTable:DataType[],
    changeDataTabla:(newDataTabla:User[]) => void,
    totalItemsTable:number,
    setTotalItemsTable:(size:number) => void,
    searchText:string,
    changeSearchText:(newSearchText:string) => void,
    loadingTable:boolean,
    setLoadingTable:(newLoading:boolean) => void,
    filters:string[],
    setFilters:(filters:string[]) => void,
}

export const AdministrationContext = createContext<valueAdministrationContext | null>(null);

