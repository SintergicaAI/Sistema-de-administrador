import {CircleCheck, Trash2} from "lucide-react";
import {CSSProperties, useState} from "react";
import {ModalGeneral} from "../../common";
import {ModalDeleteGroupButton} from "./ModalContentDeleteGroup.tsx";
import {Alert, ConfigProvider} from "antd";

const iconStyle:CSSProperties = {
    width: 20,
    height: 20,
    cursor: "pointer",

}

export const DeleteGroupButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showAlert,setShowAlert] = useState(false);


    const showModal = () => {
        setIsModalOpen(true);
    };


    return (
            <>
                <ConfigProvider theme={{"components": {
                        "Alert": {
                            "colorText": "#16A34A",
                            "colorSuccessBg":"#DCFCE7",
                            "colorSuccessBorder":"#16A34A"
                        }
                    }}}>
                    {showAlert ? (<Alert
                        message="Operacion efectuada correctamente"
                        type="success" showIcon
                        icon={<CircleCheck/>}
                        closable
                        style={{
                            position: 'absolute',
                            top: 30,
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                        onClose={() => {
                            setTimeout( ()=>{
                                setShowAlert(false);
                            },300)

                        }
                        }
                    />):''}

                    <Trash2
                    onClick={showModal}
                        color='var(--c_danger_400)'
                        style={iconStyle}/>
                    <ModalGeneral
                        Title={`¿Eliminar grupo?`}
                        Content={<ModalDeleteGroupButton
                            setShowAlert={setShowAlert}
                            setIsModalOpen={setIsModalOpen}/>}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}
                    />
                </ConfigProvider>
            </>
    )
}