import {Checkbox, Flex, GetProp} from 'antd';
import {useContext, useEffect, useState} from "react";
import './styles/administration.css';
import {AdministrationContext} from "../../context/Administration";
import {InputSearch, CheckBox} from "../common";
import {RadioGroup} from "../common/RadioGroup.tsx";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import { Spin } from 'antd';

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

const NotFound = ()=>{
    return (
        <p className={'label'} style={{textAlign:'center'}}>No se encontraron los grupos </p>
    )
}

const getGroups = (groups:groupItem[])=>{
    return groups.map(item=> item.name.toLowerCase());
}

export const SiderContent = () =>{

    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps;

    const [companyGroups, setCompanyGroups] = useState<string[]>([]);
    const [valueGroups,setValueGroups]=useState(getGroups(groups));
    const [loading,setLoading]=useState(true);


    const isChecked = (group:string):boolean => {

        return groups?.includes(group as never);
    }

    const handleChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setValueGroups([...(checkedValues as [])]);
    };

    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
                console.log(data);
                setLoading(false);
            setCompanyGroups(data);
        }).catch(()=>{
            setCompanyGroups([]);
        })
    }

    useEffect(() => {
        getGroupsFromCompany()
    }, []);

    useEffect(()=>{
        setValueGroups(getGroups(groups));
        console.log(groups);
    },[role,groups]);

    return (
        <div>
            <p className="label">Rol</p>
            <RadioGroup radioObjet={radioGroup}/>

            <p className="label">Grupos al que pertenece </p>
            <InputSearch
                placeholder={"Buscar"}
                styles={{marginBottom:8}}
                searchMethod={()=>{}}/>

            <Checkbox.Group
                value={[...valueGroups]}
                style={{width:"100%"}}
                onChange={handleChange}
            >
                <Flex vertical gap={5} flex="1">
                    {!loading?
                        companyGroups.map((group) =>(
                            <CheckBox
                                key={group}
                                grupo={group}
                                startChecked={isChecked(group)} />
                        )): <Spin/>}
                    {!loading && companyGroups.length == 0 ? <NotFound/>:''}
                </Flex>
            </Checkbox.Group>
        </div>
    )
}