import {AdministrationContext} from './AdministrationContext'
import {ReactNode, useState} from "react";
import {DataType} from "../../components/Administration/types/TableAdministrationTypes.ts";
import {v4 as uuid} from "uuid";
import {User} from "../../../domain/entities/User.ts";



export const AdministrationContextProvider = ({children}:{children:ReactNode}) =>{
    const [selectedRow,setSelectedRow]=useState({});
    const [hasSelected,setHasSelected ]=useState<boolean>(false);
    const [dataTable,setDataTabla] = useState<any[]>([]);
    const [searchText, setSearchText] = useState('');
    const [totalItemsTable,setTotalItemsTable]=useState(0);
    const [loadingTable, setLoadingTable] = useState(false);

    const changeSelectedRow = (newRowSelected:{}) => {
        setSelectedRow(newRowSelected);
    }

    const changeHasSelected = (newHasSelected:boolean) => {
        setHasSelected(newHasSelected);
    }

    const changeSearchText = (newSearchText:string) => {
        setSearchText(newSearchText);
    }

    const formatDataTable = (data: User[]):DataType[] => {

        return [...data.map(
            (user:any) =>
                (
                    //
                    {...user,
                        fullName:`${user.fullName}`,
                        key: uuid() as string,
                    }
                )
        )]
    }
    const changeDataTabla = (newDataTabla:User[]) => {
        setDataTabla(formatDataTable(newDataTabla));
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
                setLoadingTable
        }}>
            {children}
        </AdministrationContext.Provider>
    </>)
}