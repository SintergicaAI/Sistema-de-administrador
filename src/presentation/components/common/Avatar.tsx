import {Avatar as ComponentAvatar} from 'antd';
import {GetProps} from 'antd'

const getInitial = (fullname:string)=>{
    const firstSecondName = fullname.split(' ').slice(0,2);
    const initials = firstSecondName.map((name)=>{
        return name.charAt(0).toUpperCase();
    })
    return initials.join('');
}

type AvatarProps = GetProps<typeof ComponentAvatar>
export const Avatar = ({name,avatarProps}:
                       {name:string,avatarProps?:AvatarProps})=>{

    return (
        <ComponentAvatar shape='circle' {...avatarProps}>{getInitial(name)}</ComponentAvatar>
    );
}