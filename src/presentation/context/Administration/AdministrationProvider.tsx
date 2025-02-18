import {AdministrationContext} from './AdministrationContext'
import {ReactNode, useState} from "react";



export const AdministrationContextProvider = ({children}:{children:ReactNode}) =>{
    const [selectedRow,setSelectedRow]=useState({});
    const [hasSelected,setHasSelected ]=useState<boolean>(false);
    const [dataTable,setDataTabla] = useState<[]>([]);

    const changeSelectedRow = (newRowSelected:{}) => {
        setSelectedRow(newRowSelected);
    }

    const changeHasSelected = (newHasSelected:boolean) => {
        setHasSelected(newHasSelected);
    }


    return (<>
        <AdministrationContext.Provider
            value={{selectedRow,
                hasSelected,
                changeSelectedRow,
                changeHasSelected,
                dataTable,
                setDataTabla}}>
            {children}
        </AdministrationContext.Provider>
    </>)
}