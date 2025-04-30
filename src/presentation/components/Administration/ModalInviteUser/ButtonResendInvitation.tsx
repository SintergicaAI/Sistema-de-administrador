import { FC } from 'react';
import { Button } from 'antd';
import { MailIcon } from 'lucide-react';
import {InvitationApi} from "../../../../infrastructure/api/InvitationApi.ts";
import {RegenerateInvitation} from "../../../../application/use-cases/RegenerateUserInvitation.ts";


interface ButtonResendInvitationProps {
    email: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

const invitationApi = new InvitationApi(); // creo instancia del API
const regenerateInvitation = new RegenerateInvitation(invitationApi); // mando a llamar el método usando la instancia del
// API que creé anteriormente y también estoy creando una instancia del método que hice


export const ButtonResendInvitation: FC<ButtonResendInvitationProps> = ({
                                                                            email,
                                                                            onSuccess,
                                                                            onError
                                                                        }) => {
    const handleResend = async () => {
        try {
            await regenerateInvitation.execute(email);
            onSuccess?.();
        } catch (error) {
            onError?.(error as Error);
        }
    };

    return (
        <Button
            icon={<MailIcon size={16} />}
            onClick={handleResend}
        />
    );
};
