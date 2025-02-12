import {Avatar as ComponentAvatar,Flex} from 'antd';

const getInitial = (fullname:string)=>{
    return fullname.charAt(0).toUpperCase();
}

//Ver una mejor forma de juntar Avatar y name
export const Avatar = ({name}:{name:string})=>{
    return (
        <Flex align="center" gap='var(--sm-space)'>
            <ComponentAvatar shape='circle'>{getInitial(name)}</ComponentAvatar>
            {name}
        </Flex>
    );
}