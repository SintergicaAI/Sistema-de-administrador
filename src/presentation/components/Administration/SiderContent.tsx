import './styles/administration.css';
import {InputSearch} from "../common";
import {CheckBoxGroups} from "./CheckBoxGroups.tsx";
import {useEffect, useState} from "react";
import {RadioGroupRoles} from "./RadioGroupRoles.tsx";
import {Button, Flex, message} from "antd";
import { Download } from 'lucide-react';
import {useAdministration} from "../../context/Administration";
import {GroupBasicInfo} from "../../../domain/types/CompanyTypes.ts";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {AddGroupsToUser} from "../../../application/use-cases/AddGroupsToUser.ts";
import {ChangeUserRoleFromCompany} from "../../../application/use-cases/ChangeUserRoleFromCompany.ts";

type SelectedProps = {
    groups: GroupBasicInfo[];
    role:string;
    email:string;
    firstName:string;
}

const companyAPI = new CompanyApi();
const  addUserToGroupCompany = new AddGroupsToUser(companyAPI);
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
    const {selectedRow} = useAdministration();
    const {groups,role,firstName} = selectedRow as SelectedProps;
    const [messageApi, contextHolder] = message.useMessage();
    const [notDisabled, setNotDisabled] = useState(false);

    const onClick = () =>{

        messageApi.open({
            type:'loading',
            content:'Enviando cambios',

            duration:0,
        })

        const {email} = selectedRow as SelectedProps;

        const promiseGroup = (hasChangedGroup) ? sendNewGroups(email): Promise.resolve(true);
        const promiseRole = (hasChangedRole) ? sendNewRole(email): Promise.resolve(true);

        Promise.all([promiseGroup, promiseRole]).then(()=>{
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


    const sendNewGroups = (email:string) =>{
        console.log('Se enviarion cambios en groups')
        return addUserToGroupCompany.execute(
            email,
            groups.map(item => item.group_id)
        )
    }

    const sendNewRole = (email:string) =>{
        console.log('Se enviaron cambios en rol')
        return changeUserRoleFromCompany.execute(email,castRole(role));
    }

    useEffect(() => {
        hasChangedGroup = true;
        setNotDisabled(true);
    }, [groups]);

    useEffect(() => {
        hasChangedRole = true;
        setNotDisabled(true);
    }, [role]);

    //To enable or disabled button depending on if firstName is different
    useEffect(() => {
        setNotDisabled(false);
    }, [firstName]);

    return (
        <div>
            {contextHolder}
            <Flex vertical gap={8} style={{marginBottom:16}}>

                <p className="label">Rol</p>
                    <RadioGroupRoles/>
            </Flex>

            <Flex vertical gap={8}>
            <p className="label">Grupos al que pertenece </p>
            <InputSearch
                placeholder={"Buscar"}
                styles={{marginBottom:8}}
                queryValue={filterValue}
                queryMethod={setFilterValue}/>
            </Flex>

            <CheckBoxGroups filterValue={filterValue}/>
            <Flex justify={'center'} style={{marginTop:12}}>
                <Button type='primary'
                        icon={<Download/>}
                        onClick={onClick}
                        disabled={!notDisabled}
                >
                Guardar cambios
                </Button>
            </Flex>
        </div>
    )
}