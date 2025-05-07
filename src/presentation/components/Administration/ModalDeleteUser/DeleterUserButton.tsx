import { Trash2 } from 'lucide-react';
import {useState} from "react";
import {AlertMessages, ModalGeneral} from "../../common";
import {ModalContentDeleteUser} from "./ModalContentDeleteUser.tsx";
import {AlertConfigurationType} from "../../common/CommonTypes.ts";



export const DeleterUserButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAlert,setShowAlert] = useState(false);
    const [alertConfiguration,setAlertConfiguarion] = useState<AlertConfigurationType>(
        {
            type:"success",
            message:"Usuario eliminado exitosamente",
            description:"",
        }
    )
    const showModal = () => {
        setIsModalOpen(true);
    };


    return (
        <>
            {showAlert && <AlertMessages
                {...alertConfiguration}
                handleClose={()=> setShowAlert(false)}
            />}
            <Trash2 color='var(--c_danger_400)' onClick={showModal} style={{marginInlineStart:'auto', cursor:"pointer"}}/>
            <ModalGeneral Content={
                <ModalContentDeleteUser
                    setIsModalOpen={setIsModalOpen}
                    setAlertConfiguration={setAlertConfiguarion}
                    setShowAlert={setShowAlert}
                />}
                          isModalOpen={isModalOpen}
                          setIsModalOpen={setIsModalOpen} Title={"Eliminar usuario?"}/>
        </>
    )
}