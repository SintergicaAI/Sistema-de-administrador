import './styles/administration.css';
import {InputSearch} from "../common";
import {RadioGroup} from "../common/RadioGroup.tsx";
import {CheckBoxGroup} from "./CheckBoxGroup.tsx";
import {useState} from "react";

const radioGroup = {
    options:["Administrador","Usuario", "Dueño"],
    nameGroup:"role"
}

export const SiderContent = () =>{

    const [filterValue,setFilterValue] = useState("");
    return (
        <div>
            <p className="label">Rol</p>
            <RadioGroup radioObjet={radioGroup}/>

            <p className="label">Grupos al que pertenece </p>
            <InputSearch
                placeholder={"Buscar"}
                styles={{marginBottom:8}}
                searchMethod={setFilterValue}/>

            <CheckBoxGroup filterValue={filterValue}/>
        </div>
    )
}