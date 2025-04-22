import './styles/SideBar.css';
import { SquareCheckBig } from 'lucide-react';
import {ChangeEvent} from "react";

type Props ={
    value:string,
    checkedValue:string[],
    handleChange:(event:ChangeEvent<HTMLInputElement>) => void,
    isDisabled?:boolean,
}

export const CheckBox = ({
                             value,
                             checkedValue,
                             handleChange,
                            isDisabled,}:Props)=>{
    return (
        <>
            <input
                name={'grupo'}
                value={value}
                type="checkbox"
                onChange={handleChange}
                checked={checkedValue.includes(value)}
                disabled={isDisabled}
                   />
            <SquareCheckBig/>
        </>
    )
}