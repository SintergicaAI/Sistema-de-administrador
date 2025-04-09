import './styles/SideBar.css';
import { CircleCheckBig } from 'lucide-react';
import {ChangeEvent} from "react";

type Props = {
    value:string,
    name:string,
    isChecked?:string,
    handleChange:(event:ChangeEvent<HTMLInputElement>) => void,
}

export const RadioButton = ({value,name,isChecked,handleChange}:Props) =>{

    return (
        <>
        <label className="radio-button">
            {value}

            <input type="radio"
                   key={name}
                value={value}
                name={name}
                checked={isChecked === value}
                onChange= {handleChange}
            />
            <CircleCheckBig/>
        </label>
        </>

    )
}