import {Button} from "antd";
import {useState} from "react";
import {ModalConfiguration} from "../../common/ModalConfiguration.tsx";
import {ModalContentInviteUser} from "./ModalContentInviteUser.tsx";
import { SquarePlus } from 'lucide-react';

const styleIcon:React.CSSProperties = {
    width: '20px',
    height: '20px',

}

export const ButtonModalInviteUser = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (<>
            <Button type="primary"
                    icon={<SquarePlus style={styleIcon}/>}
            onClick={showModal}>
                Nuevo usuario
            </Button>

            <ModalConfiguration
                Content={<ModalContentInviteUser/>}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                Title={'Invitar a un nuevo usuario'}
            />
        </>)
}