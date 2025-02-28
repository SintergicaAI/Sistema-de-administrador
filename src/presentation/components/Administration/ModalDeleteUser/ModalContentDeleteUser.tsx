import {Dispatch, SetStateAction, useContext} from "react";
import {AdministrationContext} from "../../../context/Administration";
import {DataType} from "../types/TableAdministrationTypes.ts";
import {CompanyApi} from "../../../../infrastructure/api/CompanyApi.ts";
import {DeleteUser} from "../../../../application/use-cases/DeleteUser.ts";

const companyApi = new CompanyApi();
const deleteUser = new DeleteUser(companyApi);

type Props = {
    setIsModalOpen:Dispatch<SetStateAction<any>>;
}


export const ModalContentDeleteUser = ({setIsModalOpen}:Props) =>{
    const {selectedRow,dataTable,setDataTabla,changeHasSelected} = useContext(AdministrationContext);

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
        <>
            <p>Soy un parrafo</p>
        </>
    )
}