import './styles/administration.css';
import {InputSearch} from "../common";
import {CheckBoxGroups} from "./CheckBoxGroups.tsx";
import {useState} from "react";
import {RadioGroupRoles} from "./RadioGroupRoles.tsx";

export const SiderContent = () =>{

    const [filterValue,setFilterValue] = useState("");
    return (
        <div>
            <p className="label">Rol</p>
           <RadioGroupRoles/>

            <p className="label">Grupos al que pertenece </p>
            <InputSearch
                placeholder={"Buscar"}
                styles={{marginBottom:8}}
                searchMethod={setFilterValue}/>

            <CheckBoxGroups filterValue={filterValue}/>
        </div>
    )
}