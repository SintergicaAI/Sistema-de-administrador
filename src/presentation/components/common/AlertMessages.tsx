import {Alert, ConfigProvider} from "antd";
import {CSSProperties} from "react";
import {CircleX , CircleCheck} from 'lucide-react';

type Props = {
    type?: "success" | "info" | "warning"|"error"| undefined ,
    message?: string,
    handleClose:  React.MouseEventHandler<HTMLButtonElement>,
    description?:string,
    icon?:React.ReactNode,
    style?: React.CSSProperties,
}

let positionAlert:CSSProperties = {
    position: 'absolute',
    top: 30,
    left: '50%',
    transform: 'translate(-50%, -50%)',
}
export const AlertMessages = (
    {message,description,type,handleClose,style,icon}:Props) => {

    if(typeof icon == "undefined"){
        icon = type === "success" ? <CircleCheck style={{}} />:<CircleX/>
    }

    return (
        <ConfigProvider theme={{"components": {
                "Alert": {
                    colorSuccess:"#16A34A",
                    "colorSuccessBg":"#DCFCE7",
                    "colorSuccessBorder":"#16A34A",
                    colorError:"#DC2626",
                    colorErrorBg:"#FEE2E2",
                    colorErrorBorder:"#DC2626",
                    colorText: `${ type === "success" ? "#16A34A":"#DC2626"}`,
                }
            }}}>
                <Alert
                type={type}
                message={message}
                description={description}
                closable
                showIcon
                icon={icon}
                onClose={handleClose}
                style={{
                    ...positionAlert,
                    ...style,
                }}
            />
        </ConfigProvider>
    )
}