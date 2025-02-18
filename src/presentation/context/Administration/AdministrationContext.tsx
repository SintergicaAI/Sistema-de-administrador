import {createContext} from "react";

export type valueAdministrationContext = {
    changeSelectedRow:(newRowSelected:{})=>void,
    changeHasSelected:(newHasSelected:boolean)=>void,
    selectedRow:{},
    hasSelected:boolean
}

export const AdministrationContext = createContext<valueAdministrationContext>({
    changeSelectedRow:(newRowSelected:{})=>{},
    changeHasSelected:(newHasSelected:boolean)=>{},
    selectedRow:{},
    hasSelected:false
})