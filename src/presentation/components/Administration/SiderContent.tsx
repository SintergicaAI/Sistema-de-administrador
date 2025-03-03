
import {Roles} from "../../../domain/enums/UserRole.ts";
import {Groups} from "../../../domain/enums/UserGroups.ts";
import {Radio, Checkbox, Flex, GetProp} from 'antd';
import type { RadioChangeEvent } from 'antd';
import {CSSProperties, useContext, useEffect, useState} from "react";
import './styles/administration.css';
import {AdministrationContext} from "../../context/Administration";
import type {DataType} from "./types/TableAdministrationTypes.ts";
import {InputSearch, CheckBox} from "../common";
import {RadioButton} from "../common/RadioButton.tsx";
import {RadioGroup} from "../common/RadioGroup.tsx";



const radioButtonStyle:CSSProperties = {
    borderRadius:'var(--sm-radius)',

}

export const SiderContent = () =>{

    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as DataType;

    const [valueGroups,setValueGroups]=useState(groups);
    const [isCheckedRadio, setCheckedRadio]= useState(true);

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
            <RadioGroup>
                {Roles.map((rol) =>(<RadioButton
                    isChecked={rol === role ? isCheckedRadio: !isCheckedRadio}
                    rol={rol}
                    key={rol}
                    name={"roles"}
                />))}
            </RadioGroup>

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