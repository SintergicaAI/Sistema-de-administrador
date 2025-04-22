import {RadioButton} from './RadioButton';
import {ChangeEvent, useEffect, useState} from "react";
import {useAdministration} from "../../context/Administration";
import type {DataType} from "../Administration/types/TableAdministrationTypes.ts";

export type RadioGroupType = {
    options:string[];
    nameGroup:string;
}

type Props = {
    radioObjet :RadioGroupType,
}

export const RadioGroup = ({radioObjet}:Props) =>{

    //console.log(radioObjet.options);
    const [radioButtons, setRadioButtons] = useState<string[]>(radioObjet.options);
    const {selectedRow,changeSelectedRow} = useAdministration();
    const {role} = selectedRow as DataType;


    useEffect(() => {
        setRadioButtons(radioObjet.options);
    }, [radioObjet]);

    //Actualizar el dato role de selectedRow
    const handleRadioChange = (value:ChangeEvent<HTMLInputElement>)=>{
       changeSelectedRow({...selectedRow,role:value.target.value});
    }

    return (
        <div
            style={{display: "grid", gridTemplateColumns:"repeat(2,1fr)"}}
        >
            {radioButtons.map((option,index) =>(
                <RadioButton value={`${option}`}
                             name={radioObjet.nameGroup}
                             handleChange={handleRadioChange}
                             key={index}
                             isChecked={role}
                />))}
        </div>
    )
}