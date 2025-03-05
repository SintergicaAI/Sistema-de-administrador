import { Search } from 'lucide-react';
import {Input} from 'antd';
import {CSSProperties} from "react";

type Props = {
    placeholder:string,
    styles?:CSSProperties,
    searchMethod:(value:string)=>void,
}

export const InputSearch = ({placeholder,styles,searchMethod}:Props) =>{

    return (
        <Input placeholder={placeholder}
               suffix={<Search width={20} height={20} strokeWidth={1}/>}
               onPressEnter={(e) =>{
                   searchMethod(e.target?.value);

               }
               }
               style={styles}
        />

    )
}
