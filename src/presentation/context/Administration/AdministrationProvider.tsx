import {AdministrationContext} from './AdministrationContext'
import {useState} from "react";

export const AdministrationContextProvider = ({children}) =>{
    const [selectedRow,setSelectedRow]=useState({});
    const [hasSelected,setHasSelected ]=useState<boolean>(true)

    const changeSelectedRow = (newRowSelected:{}) => {
        setSelectedRow(newRowSelected);
    }

    const changeHasSelected = (newHasSelected:boolean) => {
        setHasSelected(newHasSelected);
    }


    return (<>
        <AdministrationContext.Provider value={{selectedRow, hasSelected,changeSelectedRow,changeHasSelected}}>
            {children}
        </AdministrationContext.Provider>
    </>)
}