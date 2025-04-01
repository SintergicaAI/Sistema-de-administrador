import './styles/administration.css';
import {AlertMessages, InputSearch} from "../common";
import {CheckBoxGroups} from "./CheckBoxGroups.tsx";
import {CSSProperties, useContext, useState} from "react";
import {RadioGroupRoles} from "./RadioGroupRoles.tsx";
import {Button, Flex} from "antd";
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

type AlertProps = {
    message: string;
    type: "warning" | "error"|"success";
}

const styles:CSSProperties = {
    position: 'absolute',
    top:0,
    right:"50px",
    zIndex:1,
}

const companyAPI = new CompanyApi();
const  addUserToGroupCompany = new AddUserToGroupCompany(companyAPI);
const changeUserRoleFromCompany = new ChangeUserRoleFromCompany(companyAPI);

export const SiderContent = () =>{

    const [filterValue,setFilterValue] = useState("");
    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps;
    const [propAlert, setPropAlert] = useState<AlertProps>({message:"", type:"error"});
    const [renderAlert,setRenderAlert] = useState(false);

    const handleAlert = () =>{
        setRenderAlert(false);
    }

    const onClick = () =>{
        const promiseGroup = sendNewGroups();
        const promiseRole = sendNewRole();

        Promise.all([promiseGroup, promiseRole]).then(()=>{
            console.log(`Cambios enviados:  grupos: ${groups.length} \n roles por enviar ${role}`);
            setPropAlert({message:"Cambios realizados", type:"success"});
            setRenderAlert(true);
        }).catch(()=>{
            setPropAlert({message:"No se realizaron", type:"error"});
            setRenderAlert(true);
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

    const sendNewRole = () =>{
        const {email} = selectedRow as SelectedProps;
        console.log("Envio de roles");
        return changeUserRoleFromCompany.execute(email,castRole(role));
    }


    return (
        <div>
            {renderAlert && <AlertMessages
                type={propAlert.type}
                message={propAlert.message}
                onClose={handleAlert}
                style={styles}
            />}

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