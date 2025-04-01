import {RadioGroup} from "../common/RadioGroup.tsx";
import {RadioGroupType} from "../common/RadioGroup.tsx";
import {useEffect, useState} from "react";
import {useAdministration} from "../../context/Administration";
import type {DataType} from "./types/TableAdministrationTypes.ts";
import {UserRole} from "../../../domain/enums/UserRole.ts";

const initialRadioGroup = {
    options:["Administrador","Usuario"],
    nameGroup:"role"
}

export const RadioGroupRoles = () => {
    const [radioGroups, setRadioGroups] = useState<RadioGroupType>(initialRadioGroup)
    const {selectedRow} = useAdministration();
    const {role} = selectedRow as DataType;

    useEffect(()=>{
        if(role === UserRole.OWNER){
            setRadioGroups({...radioGroups, options:[UserRole.OWNER]});
        }
        else {
            setRadioGroups({...initialRadioGroup});
        }
    },[role])

    return (
        <>
            <RadioGroup radioObjet={radioGroups}/>
        </>
    )
}