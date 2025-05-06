import {Button} from "antd";
import {useState} from "react";
import {AlertMessages, ModalGeneral} from "../../common";
import {ModalContentInviteUser} from "./ModalContentInviteUser.tsx";
import {AlertConfigurationType} from "../../common/CommonTypes.ts";
import {SquarePlus} from "lucide-react";

const styleIcon:React.CSSProperties = {
    width: '20px',
    height: '20px',

}

export const ButtonModalInviteUser = ()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [invitationSend,setInvitationSend] = useState(false);
    const [alertConfiguration,setAlertConfiguarion] = useState<AlertConfigurationType>(
        {
            type:"success",
            message:"Invitacion enviada correctamente",
            description:"",
        }
    )

    const showModal = () => {
        setIsModalOpen(true);
    };

    return (<>

    {invitationSend && <AlertMessages
        {...alertConfiguration}
        handleClose={()=>{setInvitationSend(false)}} />}
            <Button type="primary"
                    icon={<SquarePlus style={styleIcon}/>}
            onClick={showModal}>
                Nuevo usuario
            </Button>

            <ModalGeneral
                Content={<ModalContentInviteUser
                    setIsModalOpen={setIsModalOpen}
                    setInvitationSend={setInvitationSend}
                    setAlertConfiguration={setAlertConfiguarion}
                />}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                Title={'Invitar a un nuevo usuario'}
            />
        </>)
}