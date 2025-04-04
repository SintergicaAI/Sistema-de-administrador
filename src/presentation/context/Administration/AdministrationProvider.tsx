import {AdministrationContext, RowSelectedType} from './AdministrationContext'
import {ReactNode, useState} from "react";
import {User} from "../../../domain/entities/User.ts";
import {formatData} from "../../utilities";



export const AdministrationContextProvider = ({children}:{children:ReactNode}) =>{
    const [selectedRow,setSelectedRow]=useState<RowSelectedType >({} as RowSelectedType);
    const [hasSelected,setHasSelected ]=useState<boolean>(false);
    const [dataTable,setDataTabla] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [totalItemsTable,setTotalItemsTable]=useState(0); //TODO:Intentar implementar el valor calculado
    const [loadingTable, setLoadingTable] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);

    const changeSelectedRow = (newRowSelected:RowSelectedType) => {
        setSelectedRow(newRowSelected);
    }

    const changeHasSelected = (newHasSelected:boolean) => {
        setHasSelected(newHasSelected);
    }

    const changeSearchText = (newSearchText:string) => {
        setSearchText(newSearchText);
    }

    const changeDataTabla = (newDataTabla:User[]) => {
        setDataTabla(formatData(newDataTabla));
    }



    return (<>
        <AdministrationContext.Provider
            value={{selectedRow,
                hasSelected,
                changeSelectedRow,
                changeHasSelected,
                dataTable,
                totalItemsTable,
                setTotalItemsTable,
                changeDataTabla,
                searchText,
                changeSearchText,
                loadingTable,
                setLoadingTable,
                filters,
                setFilters
        }}>
            {children}
        </AdministrationContext.Provider>
    </>)
}