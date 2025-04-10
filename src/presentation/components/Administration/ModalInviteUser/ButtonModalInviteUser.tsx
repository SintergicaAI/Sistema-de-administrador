import {Button, Alert, ConfigProvider} from "antd";
import {useState} from "react";
import {ModalGeneral} from "../../common";
import {ModalContentInviteUser} from "./ModalContentInviteUser.tsx";
import { SquarePlus } from 'lucide-react';
import { CircleCheck } from 'lucide-react';

const styleIcon:React.CSSProperties = {
    width: '20px',
    height: '20px',

}

export const ButtonModalInviteUser = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invitationSend,setInvitationSend] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (<>
        <ConfigProvider theme={{"components": {
                "Alert": {
                    "colorText": "#16A34A",
                    "colorSuccessBg":"#DCFCE7",
                    "colorSuccessBorder":"#16A34A"
                }
            }}}>

            {invitationSend ? (<Alert
                message="Invitacion enviada correctamente"
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
                        setInvitationSend(false);
                    },300)

                    }
                }
            />):''}
            <Button type="primary"
                    icon={<SquarePlus style={styleIcon}/>}
            onClick={showModal}>
                Nuevo usuario
            </Button>

            <ModalGeneral
                Content={<ModalContentInviteUser
                    setIsModalOpen={setIsModalOpen}
                    setInvitationSend={setInvitationSend}
                />}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                Title={'Invitar a un nuevo usuario'}
            />
        </ConfigProvider>
        </>)
}