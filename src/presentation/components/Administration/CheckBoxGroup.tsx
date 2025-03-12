import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AdministrationContext} from "../../context/Administration";
import type {DataType} from "./types/TableAdministrationTypes.ts";
import {Flex,Spin} from "antd";
import {CheckBox} from "../common";
import {NotFound} from "../common/NotFound.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";

const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);

type groupItem = {
    id: string;
    name: string;
}
type SelectedProps ={
    groups:groupItem[];
}
const getGroups = (groups:groupItem[])=>{
    return groups.map(item=> item.name.toLowerCase());
}

export const CheckBoxGroup = ()=>{
    const {selectedRow,changeSelectedRow} = useContext(AdministrationContext);
    const {groups} = selectedRow as SelectedProps ;

    const [companyGroups, setCompanyGroups] = useState<string[]>([]);
    const [userGroup, setUserGroup] = useState<string[]>(getGroups(groups));
    const [loading,setLoading]=useState(true);

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

    useEffect(() => {
        setUserGroup(getGroups(groups));
        console.log(userGroup);
    }, [groups]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) => {
        console.log(value.target.value);
        /*changeSelectedRow({...selectedRow,groups:[]});*/
    }
    return (<>
        <Flex gap={5} flex="1" vertical>
            {!loading?
                companyGroups.map((groupFromCompany,index) =>(
                    <CheckBox
                        key={index}
                        grupo={groupFromCompany}
                        handleChange={handleCheckBoxGroup}
                        checkedValue={userGroup}
                         />
                )): <Spin/>}
            {!loading && companyGroups.length == 0 ? <NotFound message={'No se encontraron los grupos'}/>:''}
        </Flex>
    </>)
}