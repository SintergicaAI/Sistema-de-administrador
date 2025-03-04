
import {Groups} from "../../../domain/enums/UserGroups.ts";
import {Checkbox, Flex, GetProp} from 'antd';
import {useContext, useEffect, useState} from "react";
import './styles/administration.css';
import {AdministrationContext} from "../../context/Administration";
import type {DataType} from "./types/TableAdministrationTypes.ts";
import {InputSearch, CheckBox} from "../common";
import {RadioGroup} from "../common/RadioGroup.tsx";

const radioGroup = {
    options:["Administrador","Usuario", "Dueño"],
    nameGroup:"role"
}


export const SiderContent = () =>{

    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as DataType;

    const [valueGroups,setValueGroups]=useState(groups);
    const [valueRole,setValueRole]=useState(role);

    useEffect(()=>{
        setValueGroups(groups);
    },[role,groups]);

    const isChecked = (group:string):boolean => {

        return groups?.includes(group as never);
    }

    const handleChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setValueGroups([...(checkedValues as [])]);
    };


    return (
        <div>
            <p className="label">Rol</p>
            <RadioGroup radioObjet={radioGroup}/>

            <p className="label">Grupos al que pertenece </p>
            <InputSearch
                placeholder={"Buscar"}
                styles={{marginBottom:8}}
                searchMethod={(value)=>{}}/>

            {/*value={[...groups]}*/}
            <Checkbox.Group
                value={[...valueGroups]}
                style={{width:"100%"}}
                onChange={handleChange}
            >
                <Flex vertical gap={5} flex="1">
                    {
                        Groups.map((group) =>(<CheckBox
                            key={group}
                            grupo={group}
                            startChecked={isChecked(group)}
                        />))
                    }
                </Flex>
            </Checkbox.Group>

        </div>
    )
}