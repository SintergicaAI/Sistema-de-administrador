import './styles/SideBar.css';
import { CircleCheckBig } from 'lucide-react';
import {ChangeEvent, useRef} from "react";

type Props = {
    rol:string,
    name:string,
    isChecked?:string,
    handleChange:(event:ChangeEvent<HTMLInputElement>) => void,
}

export const RadioButton = ({rol,name,isChecked,handleChange}:Props) =>{

    /*Me sale un Warning*/
    //const checkedProp = isChecked ? {checked:true} : {};
    return (
        <>
        <label className="radio-button">
            {rol}
            <input type="radio"
                   key={name}
                value={rol}
                name={name}
               checked={isChecked === rol}
               onChange= {handleChange}
            />
            <CircleCheckBig/>
        </label>
        </>

    )
}