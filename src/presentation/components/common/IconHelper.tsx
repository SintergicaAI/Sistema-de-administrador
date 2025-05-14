import { CircleHelp } from 'lucide-react';
import { Tooltip } from 'antd';

type Props ={
    message: string,
}
export const IconHelper = ({message}:Props)=>{
    return (
        <Tooltip title={message}>
            <CircleHelp style={{
                color:'var(--c_slate_500)',
                width:'20px',
                height:'20px',
            }} />
        </Tooltip>
    )
}