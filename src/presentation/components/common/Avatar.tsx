import {Avatar as ComponentAvatar} from 'antd';
import {CSSProperties} from "react";

type Props = {
    name: string,
    style?:CSSProperties
    type?: "active" | "invitate"
}

const getInitial = (fullname:string)=>{
    const firstSecondName = fullname.split(' ').slice(0,2);
    const initials = firstSecondName.map((name)=>{
        return name.charAt(0).toUpperCase();
    })
    return initials.join('');
}



export const Avatar = ({name,style,type}:Props)=>{

    const avatarName = (type === "active") ? getInitial(name) : "Inv";
    return (
        <ComponentAvatar shape='circle' style={style}>{
            avatarName
        }</ComponentAvatar>
    );
}