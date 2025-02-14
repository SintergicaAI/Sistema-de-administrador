import {Avatar as ComponentAvatar,Flex} from 'antd';
import {CSSProperties} from "react";

const getInitial = (fullname:string)=>{
    return fullname.charAt(0).toUpperCase();
}

//Ver una mejor forma de juntar Avatar y name
export const Avatar = ({name,style={}}:{name:string,style:CSSProperties |{}})=>{

    return (
        <Flex align="center" gap='var(--sm-space)' style={style}>
            <ComponentAvatar shape='circle'>{getInitial(name)}</ComponentAvatar>
            {name}
        </Flex>
    );
}