import {Avatar as ComponentAvatar} from 'antd';
import {CSSProperties} from "react";

const getInitial = (fullname:string)=>{
    const firstSecondName = fullname.split(' ').slice(0,2);
    const initials = firstSecondName.map((name)=>{
        return name.charAt(0).toUpperCase();
    })
    return initials.join('');
}

export const Avatar = ({name,style}:
                       {name:string,style?:CSSProperties})=>{

    return (
        <ComponentAvatar shape='circle' style={style}>{getInitial(name)}</ComponentAvatar>
    );
}