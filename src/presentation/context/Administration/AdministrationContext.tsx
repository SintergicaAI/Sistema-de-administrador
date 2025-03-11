import {createContext} from "react";
import {DataType} from "../../components/Administration/types/TableAdministrationTypes.ts";
import {User} from "../../../domain/entities/User.ts";


export type valueAdministrationContext = {
    changeSelectedRow:(newRowSelected:{})=>void,
    changeHasSelected:(newHasSelected:boolean)=>void,
    selectedRow:{},
    hasSelected:boolean,
    dataTable:DataType[],
    changeDataTabla:(newDataTabla:User[]) => void,
    totalItemsTable:number,
    setTotalItemsTable:(size:number) => void,
    searchText:string,
    changeSearchText:(newSearchText:string) => void,
    loadingTable:boolean,
    setLoadingTable:(newLoading:boolean) => void,
}

export const AdministrationContext = createContext<valueAdministrationContext>({
    changeSelectedRow:()=>{},
    changeHasSelected:()=>{},
    selectedRow:{},
    hasSelected:false,
    dataTable:[],
    totalItemsTable:0,
    setTotalItemsTable:() => {},
    changeDataTabla:() =>{},
    searchText:'',
    changeSearchText:() => {},
    loadingTable:false,
    setLoadingTable:() => {},
})