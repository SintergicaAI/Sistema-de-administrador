import {Avatar as ComponentAvatar} from 'antd';
import {CSSProperties} from "react";
import {getInitialLettersFromName} from "../../utilities";

type Props = {
    name: string,
    style?:CSSProperties
    type?: "active" | "invitate"
}
export const Avatar = ({name,style,type}:Props)=>{

    const avatarName = (type === "active") ? getInitialLettersFromName(name) : "Inv";
    return (
        <ComponentAvatar shape='circle' style={style}>{
            avatarName
        }</ComponentAvatar>
    );
}