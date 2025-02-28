import { Trash2 } from 'lucide-react';
import {useState} from "react";
import {ModalConfiguration} from "../../common/ModalConfiguration.tsx";
import {ModalContentDeleteUser} from "./ModalContentDeleteUser.tsx";



export const DeleterUserButton = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };


    return (
        <>
            <Trash2 color='var(--c_danger_400)' onClick={showModal} style={{marginInlineStart:'auto'}}/>
            <ModalConfiguration Content={<ModalContentDeleteUser setIsModalOpen={setIsModalOpen}/>}
                                isModalOpen={isModalOpen}
                                setIsModalOpen={setIsModalOpen} Title={"Eliminar usuario?"}/>
        </>
    )
}