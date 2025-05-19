import { CircleHelp } from 'lucide-react';
import { Tooltip } from 'antd';
import {CSSProperties} from "react";

type Props ={
    message: string,
    style?: CSSProperties,
}
export const IconHelper = ({message,style}:Props)=>{
    return (
        <Tooltip title={message}>
            <CircleHelp style={{
                color:'var(--c_slate_500)',
                width:'20px',
                height:'20px',
                ...style
            }} />
        </Tooltip>
    )
}