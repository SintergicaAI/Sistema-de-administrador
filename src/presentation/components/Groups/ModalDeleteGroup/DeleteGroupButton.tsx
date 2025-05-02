import {useParams} from "react-router";
import {Trash2} from "lucide-react";
import {CSSProperties, useState} from "react";
import {ModalGeneral} from "../../common";
import {ModalDeleteGroupButton} from "./ModalContentDeleteGroup.tsx";

const iconStyle:CSSProperties = {
    width: 20,
    height: 20,
    cursor: "pointer",

}

export const DeleteGroupButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {nameGroup} = useParams();

    const showModal = () => {
        setIsModalOpen(true);
    };


    return (
            <>
                <Trash2
                onClick={showModal}
                    color='var(--c_danger_400)'
                    style={iconStyle}/>
                <ModalGeneral
                    Title={`Eliminar el grupo ${nameGroup?.toLowerCase()} ?`}
                    Content={<ModalDeleteGroupButton setIsModalOpen={setIsModalOpen}/>}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </>
    )
}