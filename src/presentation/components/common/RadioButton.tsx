import './styles/SideBar.css';
import { CircleCheckBig } from 'lucide-react';
import {useRef, useState} from "react";

type Props = {
    rol:string,
    name:string,
    isChecked:boolean,
    changeChecked?:() => void,
}

export const RadioButton = ({rol,name,isChecked}:Props) =>{

    const inputRef = useRef(null);
    return (
        <>
        <label htmlFor={rol}  className="radio-button">
            {rol}
            <input type="radio"
                id={rol}
                   ref={inputRef}
                value={rol.toLowerCase()}
                name={name}
               checked={isChecked}
               onChange={(e:any) => {
                   //console.log( document.querySelector("input[type=radio]:checked"))
                    console.log(e.target);
                   }}
            />
            <CircleCheckBig/>
        </label>
        </>

    )
}