import {AdministrationContext} from './AdministrationContext'
import {ReactNode, useState} from "react";



export const AdministrationContextProvider = ({children}:{children:ReactNode}) =>{
    const [selectedRow,setSelectedRow]=useState({});
    const [hasSelected,setHasSelected ]=useState<boolean>(false);
    const [dataTable,setDataTabla] = useState<[]>([]);
    const [searchText, setSearchText] = useState('');
    const [totalItemsTable,setTotalItemsTable]=useState(0);

    const changeSelectedRow = (newRowSelected:{}) => {
        setSelectedRow(newRowSelected);
    }

    const changeHasSelected = (newHasSelected:boolean) => {
        setHasSelected(newHasSelected);
    }

    const changeSearchText = (newSearchText:string) => {
        setSearchText(newSearchText);
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
                setDataTabla,
                searchText,
                changeSearchText,

        }}>
            {children}
        </AdministrationContext.Provider>
    </>)
}