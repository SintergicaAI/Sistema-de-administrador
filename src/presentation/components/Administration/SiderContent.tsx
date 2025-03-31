import './styles/administration.css';
import {InputSearch} from "../common";
import {CheckBoxGroups} from "./CheckBoxGroups.tsx";
import {useContext, useState} from "react";
import {RadioGroupRoles} from "./RadioGroupRoles.tsx";
import {Button, Flex} from "antd";
import { Download } from 'lucide-react';
import {AdministrationContext} from "../../context/Administration";
import {GroupType} from "../../../domain/types/CompanyTypes.ts";

type SelectedProps = {
    groups: GroupType[];
    role:string;
}

export const SiderContent = () =>{

    const [filterValue,setFilterValue] = useState("");
    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps;

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
            <Flex justify={'center'} style={{marginTop:12}}>
                <Button type='primary'
                        icon={<Download/>}
                        onClick={() => {
                            console.log(`grupos por enviar ${groups.length} \n roles por enviar ${role}`);}} >
                Guardar cambios
            </Button>
            </Flex>
        </div>
    )
}