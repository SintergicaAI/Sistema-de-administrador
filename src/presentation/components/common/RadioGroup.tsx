import {RadioButton} from './RadioButton';
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AdministrationContext} from "../../context/Administration";
import type {DataType} from "../Administration/types/TableAdministrationTypes.ts";
import {Roles} from "../../../domain/enums/UserRole.ts";

type RadioGroup = {
    options:string[];
    nameGroup:string;
}

type Props = {
    radioObjet :RadioGroup,
}

export const RadioGroup = ({radioObjet}:Props) =>{

    //console.log(radioObjet.options);
    const [radioButtons, setRadioButtons] = useState<string[]>(radioObjet.options);
    const {selectedRow,changeSelectedRow} = useContext(AdministrationContext);
    const {role} = selectedRow as DataType;


    //Actualizar el dato role de selectedRow
    const handleRadioChange = (value:ChangeEvent<HTMLInputElement>)=>{
       changeSelectedRow({...selectedRow,role:value.target.value});
        console.log(value.target.value);
        console.log(selectedRow);
    }

    return (
        <div
            style={{display: "flex", flexDirection: "column", gap:3}}
        >
            {/*{
                Roles.map((rol,index) => (<RadioButton rol={`${rol}`}
                                               name={"role"}
                                               handleChange={handleRadioChange}
                                               key={index}
                                               isChecked={role} /> ))
            }*/}
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