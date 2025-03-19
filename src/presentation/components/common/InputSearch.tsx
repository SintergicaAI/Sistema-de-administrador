import { Search } from 'lucide-react';
import {Input} from 'antd';
import {CSSProperties, useRef, useState} from "react";

type Props = {
    placeholder:string,
    styles?:CSSProperties,
    searchMethod:(value:string)=>void,
}

export const InputSearch = ({placeholder,styles,searchMethod}:Props) =>{

    const [inputValue, setInputValue] = useState("");
    return (
        <Input placeholder={placeholder}
               value={inputValue}
               suffix={<Search width={20}
                               height={20}
                               strokeWidth={1}
                               onClick={()=>{ searchMethod(inputValue);}}
               />}
               style={styles}
               onChange={(e) =>{
                   setInputValue(e.target.value);
                   searchMethod(e.target.value)}
        }
        />

    )
}
