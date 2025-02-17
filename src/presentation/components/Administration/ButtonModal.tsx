import {UserRoundPlus} from "lucide-react";
import {Button} from "antd";
import {useState} from "react";
import {ModalConfiguration} from "../common/ModalConfiguration.tsx";
import {ModalContent} from "./ModalContent.tsx";

const styleIcon:React.CSSProperties = {
    width: '20px',
    height: '20px',

}

export const ButtonModal = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (<>
            <Button type="primary"
                    icon={<UserRoundPlus style={styleIcon}/>}
            onClick={showModal}>
                Nuevo usuario
            </Button>

            <ModalConfiguration
                Content={<ModalContent/>}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                Title={'Invitar a usuario'}
            />
        </>)
}