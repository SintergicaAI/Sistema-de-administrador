import {createContext} from "react";

export type valueAdministrationContext = {
    changeSelectedRow:(newRowSelected:{})=>void,
    changeHasSelected:(newHasSelected:boolean)=>void,
    selectedRow:{},
    hasSelected:boolean,
    dataTable:[],
    setDataTabla:(newDataTabla:[]) => void,
    searchText:string,
    changeSearchText:(newSearchText:string) => void,
}

export const AdministrationContext = createContext<valueAdministrationContext>({
    changeSelectedRow:(newRowSelected:{})=>{},
    changeHasSelected:(newHasSelected:boolean)=>{},
    selectedRow:{},
    hasSelected:false,
    dataTable:[],
    setDataTabla:(newDataTabla:{}) =>{},
    searchText:'',
    changeSearchText:(newSearchText:string) => {},
})