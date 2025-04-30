import {InvitationApi} from "../../../../infrastructure/api/InvitationApi.ts";
import {DeleteInvitation} from "../../../../application/use-cases/DeleteUserInvitation.ts";
import {Trash2} from "lucide-react";
import { Button } from 'antd';
import {FC} from "react";

interface ButtonDeleteInvitationProps {
    email: string;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
}

const invitationApi = new InvitationApi();
const deleteInvitation = new DeleteInvitation(invitationApi);

export const ButtonDeleteInvitation: FC<ButtonDeleteInvitationProps> = ({
    email,
    onSuccess,
    onError
}) => {
    const handleDelete = async () => {
        try {
            await deleteInvitation.execute(email);
            onSuccess?.();
        } catch (error) {
            onError?.(error as Error);
        }
    };

    return (
        <Button
            icon={<Trash2 size={16} />}
            onClick={handleDelete}
        />
    )
}