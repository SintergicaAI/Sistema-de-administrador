import {createContext} from "react";
import {DataType} from "../../components/Administration/types/TableAdministrationTypes.ts";


export type valueAdministrationContext = {
    changeSelectedRow:(newRowSelected:{})=>void,
    changeHasSelected:(newHasSelected:boolean)=>void,
    selectedRow:{},
    hasSelected:boolean,
    dataTable:DataType[],
    setDataTabla:(newDataTabla:DataType[]) => void,
    totalItemsTable:number,
    setTotalItemsTable:(size:number) => void,
    searchText:string,
    changeSearchText:(newSearchText:string) => void,
}

export const AdministrationContext = createContext<valueAdministrationContext>({
    changeSelectedRow:(newRowSelected:{})=>{},
    changeHasSelected:(newHasSelected:boolean)=>{},
    selectedRow:{},
    hasSelected:false,
    dataTable:[],
    totalItemsTable:0,
    setTotalItemsTable:(size:number) => {},
    setDataTabla:(newDataTabla:{}) =>{},
    searchText:'',
    changeSearchText:(newSearchText:string) => {},
})