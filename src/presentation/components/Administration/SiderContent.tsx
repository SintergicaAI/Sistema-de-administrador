import {Checkbox, Flex, GetProp} from 'antd';
import {useContext, useEffect, useState} from "react";
import './styles/administration.css';
import {AdministrationContext} from "../../context/Administration";
import {InputSearch, CheckBox} from "../common";
import {RadioGroup} from "../common/RadioGroup.tsx";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import { Spin } from 'antd';
import {CheckBoxGroup} from "./CheckBoxGroup.tsx";

const radioGroup = {
    options:["Administrador","Usuario", "Dueño"],
    nameGroup:"role"
}

type SelectedProps ={
    groups:groupItem[];
    role:string;
}

type groupItem = {
    id: string;
    name: string;
}

const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);

const getGroups = (groups:groupItem[])=>{
    return groups.map(item=> item.name.toLowerCase());
}

export const SiderContent = () =>{

    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps;

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