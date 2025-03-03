
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



const radioButtonStyle:CSSProperties = {
    borderRadius:'var(--sm-radius)',

}

export const SiderContent = () =>{

    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as DataType;

    const [valueRadio,setValueRadio]=useState(role);
    const [valueGroups,setValueGroups]=useState(groups);

    useEffect(()=>{
        setValueRadio(role);
        setValueGroups(groups);
    },[role,groups]);

    const isChecked = (group:string):boolean => {

        return groups?.includes(group as never);
    }
    const onChange = (e: RadioChangeEvent) => {
        setValueRadio(e.target.value);
    };

    const handleChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setValueGroups([...(checkedValues as [])]);
    };

    return (
        <div>
            <p className="label">Rol</p>
            <Radio.Group defaultValue={role?.toLowerCase()}
                         style={{display: "flex", flexDirection: "column", gap:3}}
                         name="role"
                         value={valueRadio.toLowerCase()}
                         onChange={onChange}
            >



                {/*PREGUNTA:Lo ideal no seria hacer una peticion al backend y traer los roles?*/}

                {Roles.map((rol) =>(<RadioButton
                    rol={rol}
                    key={rol}
                    name={"roles"}
                />))}

            </Radio.Group>
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