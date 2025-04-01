import './styles/administration.css';
import {InputSearch} from "../common";
import {CheckBoxGroups} from "./CheckBoxGroups.tsx";
import {useContext, useEffect, useState} from "react";
import {RadioGroupRoles} from "./RadioGroupRoles.tsx";
import {Button, Flex, message} from "antd";
import { Download } from 'lucide-react';
import {AdministrationContext} from "../../context/Administration";
import {GroupType} from "../../../domain/types/CompanyTypes.ts";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {AddUserToGroupCompany} from "../../../application/use-cases/AddUserToGroupCompany.ts";
import {ChangeUserRoleFromCompany} from "../../../application/use-cases/ChangeUserRoleFromCompany.ts";

type SelectedProps = {
    groups: GroupType[];
    role:string;
    email:string;
}

const companyAPI = new CompanyApi();
const  addUserToGroupCompany = new AddUserToGroupCompany(companyAPI);
const changeUserRoleFromCompany = new ChangeUserRoleFromCompany(companyAPI);

//Variables to detected changes in role and groups
let hasChangedRole = false;
let hasChangedGroup = false;

const castRole = (role: string) =>{
    if (!role) return "Usuario";

    switch (role) {
        case 'Dueño':
            return "OWNER";
        case 'Administrador':
            return "ADMIN";
        default:
            return 'USER';
    }
}

export const SiderContent = () =>{

    const [filterValue,setFilterValue] = useState("");
    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps;
    const [messageApi, contextHolder] = message.useMessage();

    const onClick = () =>{

        messageApi.open({
            type:'loading',
            content:'Enviando cambios',
            duration:0,
        })

        const promiseGroup = (hasChangedGroup) ? sendNewGroups(): Promise.resolve(true);
        const promiseRole = (hasChangedRole) ? sendNewRole(): Promise.resolve(true);

        Promise.all([promiseGroup, promiseRole]).then(()=>{
            console.log(`Cambios enviados:  grupos: ${groups.length} \n roles por enviar ${role}`);
            messageApi.destroy();
            messageApi.open({
                type:'success',
                content:'Datos enviados',
                duration:0,
            })
        }).catch(()=>{
            messageApi.destroy();
            messageApi.open({
                type:'error',
                content:'Error del servidor, inténtelo más tarde',
                duration:0,
            })
        }).finally(()=>{
            hasChangedRole = false;
            hasChangedGroup = false;
            setTimeout(()=>{
                messageApi.destroy();
            },1000)
        })
    }

    const sendNewGroups = () =>{
        const {email} = selectedRow as SelectedProps
        console.log("envio de grupos");
        return addUserToGroupCompany.execute(
            email,
            groups.map(item => item.group_id)
        )
    }


    const sendNewRole = () =>{
        const {email} = selectedRow as SelectedProps;
        console.log("Envio de roles");
        return changeUserRoleFromCompany.execute(email,castRole(role));
    }

    useEffect(() => {
        hasChangedGroup = true;
    }, [groups]);

    useEffect(() => {
        hasChangedRole = true;
    }, [role]);

    return (
        <div>
            {contextHolder}
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
                        onClick={onClick}>
                Guardar cambios
            </Button>
            </Flex>
        </div>
    )
}