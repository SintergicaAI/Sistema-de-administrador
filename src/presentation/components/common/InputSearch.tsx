import { Search } from 'lucide-react';
import {Input} from 'antd';
import {CSSProperties, useRef} from "react";
type Props = {
    placeholder:string,
    queryValue:string;
    queryMethod:(value:any)=>void,
    styles?:CSSProperties,
}

export const InputSearch = ({
                                placeholder,
                                styles,
                                queryValue,
                                queryMethod}:Props) =>{

    const handleChange  = (event:React.ChangeEvent<HTMLInputElement>)=>{
        queryMethod(event.target.value)
    }
    const inputRef = useRef(null);

    return (
        <Input placeholder={placeholder}
               value={queryValue}
               ref={inputRef}
               suffix={<Search width={20}
                               height={20}
                               strokeWidth={1}
                               style={{cursor:"pointer"}}
                               onClick={ ()=>{ // @ts-ignore
                                   queryMethod(inputRef.current?.value)}}/>}
               style={styles}
               onChange={handleChange}
        />

    )
}
