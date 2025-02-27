import { Trash2 } from 'lucide-react';
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {DeleteUser} from "../../../application/use-cases/DeleteUser.ts";
import {useContext} from "react";
import {AdministrationContext} from "../../context/Administration";
import {DataType} from "./types/TableAdministrationTypes.ts";


const companyApi = new CompanyApi();
const deleteUser = new DeleteUser(companyApi);
export const DeleterUserButton = ()=>{
    const {selectedRow,dataTable,setDataTabla,changeHasSelected} = useContext(AdministrationContext);


    //Pregunta Alexis si esto esta bien
    const handleDelete = async ()=>{
        const {email} = selectedRow as DataType;
        try{
            const deletedUser = await deleteUser.execute(email);
            const newData = dataTable.filter((data)=>data.email !== deletedUser.email);
            console.log(newData);
            setDataTabla(newData);
            changeHasSelected(false);
        }catch(e){
            console.log(e);
        }

    }

    return (
        <Trash2 color='var(--c_danger_400)' onClick={handleDelete}/>
    )
}