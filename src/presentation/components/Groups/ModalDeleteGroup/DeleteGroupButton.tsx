import {Trash2} from "lucide-react";
import {CSSProperties, useState} from "react";
import {AlertMessages, ModalGeneral} from "../../common";
import {ModalDeleteGroupButton} from "./ModalContentDeleteGroup.tsx";
import {AlertConfigurationType} from "../../common/CommonTypes.ts";

const iconStyle:CSSProperties = {
    width: 20,
    height: 20,
    cursor: "pointer",

}

export const DeleteGroupButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAlert,setShowAlert] = useState(false);
    const [alertConfiguration, setAlertConfiguration] = useState<AlertConfigurationType>({
        message:'Operación realizada con éxito',
        type:"success",
        description:""
    });

    const showModal = () => {
        setIsModalOpen(true);
    };


    return (
            <>
                {showAlert ? (<AlertMessages
                    {...alertConfiguration}
                    handleClose={()=>{setShowAlert(false);}}
                />):''}

                    <Trash2
                        onClick={showModal}
                        color='var(--c_danger_400)'
                        style={iconStyle}
                    />

                    <ModalGeneral
                        Title={`¿Eliminar grupo?`}
                        Content={
                        <ModalDeleteGroupButton
                            setAlertConfiguration={setAlertConfiguration}
                            setShowAlert={setShowAlert}
                            setIsModalOpen={setIsModalOpen}
                        />}

                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
            </>
    )
}