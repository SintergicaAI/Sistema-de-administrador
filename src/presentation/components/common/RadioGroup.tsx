import {RadioButton} from './RadioButton';
import {ChangeEvent, useContext, useState} from "react";
import {AdministrationContext} from "../../context/Administration";
import type {DataType} from "../Administration/types/TableAdministrationTypes.ts";

type RadioGroup = {
    options:string[];
    nameGroup:string;
}

type Props = {
    radioObjet :RadioGroup,
}

export const RadioGroup = ({radioObjet}:Props) =>{

    //console.log(radioObjet.options);
    const [radioButtons] = useState<string[]>(radioObjet.options);
    const {selectedRow,changeSelectedRow} = useContext(AdministrationContext);
    const {role} = selectedRow as DataType;


    //Actualizar el dato role de selectedRow
    const handleRadioChange = (value:ChangeEvent<HTMLInputElement>)=>{
       changeSelectedRow({...selectedRow,role:value.target.value});
    }

    return (
        <div
            style={{display: "grid", gridTemplateColumns:"repeat(2,1fr)"}}
        >
            {radioButtons.map((option,index) =>(
                <RadioButton rol={`${option}`}
                             name={radioObjet.nameGroup}
                             handleChange={handleRadioChange}
                             key={index}
                             isChecked={role}
                />))}
        </div>
    )
}