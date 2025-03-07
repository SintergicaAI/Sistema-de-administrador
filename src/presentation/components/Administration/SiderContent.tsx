import {Checkbox, Flex, GetProp} from 'antd';
import {useContext, useEffect, useState} from "react";
import './styles/administration.css';
import {AdministrationContext} from "../../context/Administration";
import {InputSearch, CheckBox} from "../common";
import {RadioGroup} from "../common/RadioGroup.tsx";
import {LocalOperation} from "../../../infrastructure/api/LocalOperation.ts";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";

const radioGroup = {
    options:["Administrador","Usuario", "Dueño"],
    nameGroup:"role"
}

type SelectedProps ={
    groups:string[];
    role:string;
}

const companyAPI = new LocalOperation();
const getGroupCompany = new GetCompanyGroups(companyAPI);

const NotFound = ()=>{
    return (
        <p className={'label'} style={{textAlign:'center'}}>No se encontraron los grupos </p>
    )
}

export const SiderContent = () =>{

    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps;

    const [companyGroups, setCompanyGroups] = useState<string[]>([]);
    const [valueGroups,setValueGroups]=useState(groups);
    const [valueRole,setValueRole]=useState(role);



    const isChecked = (group:string):boolean => {

        return groups?.includes(group as never);
    }

    const handleChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setValueGroups([...(checkedValues as [])]);
    };

    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
            setCompanyGroups(data);
        }).catch((err)=>{
            setCompanyGroups([]);
        })
    }

    useEffect(() => {
        getGroupsFromCompany()
    }, []);

    useEffect(()=>{
        setValueGroups(groups);
    },[role,groups]);

    return (
        <div>
            <p className="label">Rol</p>
            <RadioGroup radioObjet={radioGroup}/>

            <p className="label">Grupos al que pertenece </p>
            <InputSearch
                placeholder={"Buscar"}
                styles={{marginBottom:8}}
                searchMethod={(value)=>{}}/>

            <Checkbox.Group
                value={[...valueGroups]}
                style={{width:"100%"}}
                onChange={handleChange}
            >
                <Flex vertical gap={5} flex="1">
                    {companyGroups.length !== 0 ?
                        companyGroups.map((group) =>(
                            <CheckBox
                                key={group}
                                grupo={group}
                                startChecked={isChecked(group)} />
                        )): <NotFound/>}

                </Flex>
            </Checkbox.Group>

        </div>
        /*companyGroups.map((group) =>(
                            <CheckBox
                        key={group}
                        grupo={group}
                        startChecked={isChecked(group)}
                    />))*/
    )
}