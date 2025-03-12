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
const getId = (groupName:string,groups:groupItem[]) =>{
    return groups.find((item)=> item.id === groupName)?.id as string;
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
    }, [groups]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) => {


        if(value.target.checked)
        {
            changeSelectedRow(
                {...selectedRow,
                    groups:[...groups,{id:value.target.id,name:value.target.value}]}
            );
        }
        else{
            const numero = [...groups].findIndex((item:groupItem)=> item.name.toLowerCase() === value.target.value.toLowerCase());
            changeSelectedRow(
                {...selectedRow,
                    groups:[...groups.filter((_, index) => index !== numero)]}
            );
        }
    }
    return (<>
        <Flex gap={5} flex="1" vertical>
            {!loading?
                companyGroups.map((groupFromCompany,index) =>(
                    <CheckBox
                        id={(getId(groupFromCompany,groups))}
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