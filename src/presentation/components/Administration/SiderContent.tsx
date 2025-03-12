import './styles/administration.css';
import {InputSearch} from "../common";
import {RadioGroup} from "../common/RadioGroup.tsx";
import {CheckBoxGroup} from "./CheckBoxGroup.tsx";

const radioGroup = {
    options:["Administrador","Usuario", "Dueño"],
    nameGroup:"role"
}

export const SiderContent = () =>{

    return (
        <div>
            <p className="label">Rol</p>
            <RadioGroup radioObjet={radioGroup}/>

            <p className="label">Grupos al que pertenece </p>
            <InputSearch
                placeholder={"Buscar"}
                styles={{marginBottom:8}}
                searchMethod={()=>{}}/>

            <CheckBoxGroup/>
        </div>
    )
}