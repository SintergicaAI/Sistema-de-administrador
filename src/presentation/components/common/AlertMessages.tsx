import {Alert, AlertProps, GetProps} from "antd";


export const AlertMessages = (
    {message,description,type,onClose,style}:GetProps<AlertProps>) => {
    return (<Alert
        type={type}
        message={message}
        description={description}
        closable
        onClose={onClose}
        style={style}
    />)
}