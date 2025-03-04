import './styles/SideBar.css';
import { CircleCheckBig } from 'lucide-react';
import {useRef} from "react";

type Props = {
    rol:string,
    name:string,
    isChecked?:boolean,
}

export const RadioButton = ({rol,name,isChecked}:Props) =>{

    const inputRef = useRef<HTMLInputElement>(null);

   /* setTimeout(()=>{
        if(isChecked){
            console.log(inputRef.current);
            inputRef.current?.setAttribute('checked',"");
        }else {
            inputRef.current?.removeAttribute('checked');
        }
    },300)*/

    /*Me sale un Warning*/
    const checkedProp = isChecked ? {checked:true} : {};
    return (
        <>
        <label htmlFor={rol}  className="radio-button">
            {rol}
            <input type="radio"
                id={rol}
               ref={inputRef}
                value={rol.toLowerCase()}
                   {...checkedProp}
                name={name}
                   onChange= {(event)=>{
                       console.log(event.target.value);
                   }}
            />
            {}
            <CircleCheckBig/>
        </label>
        </>

    )
}