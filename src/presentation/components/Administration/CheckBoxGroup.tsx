import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AdministrationContext} from "../../context/Administration";
import {Flex,Spin} from "antd";
import {CheckBox} from "../common";
import {NotFound} from "../common/NotFound.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";

const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);

type Props = {
    filterValue:string;
}

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
    return groups.find((item)=> item.name === groupName)?.id as string;
}
const groupPerPerson = new Map<string, number>();

export const CheckBoxGroup = ({filterValue}:Props)=>{
    const {selectedRow,changeSelectedRow,dataTable} = useContext(AdministrationContext);
    const {groups} = selectedRow as SelectedProps ;

    const [companyGroups, setCompanyGroups] = useState<string[]>([]);
    const [companyFilter, setCompanyFilter] = useState<string[]>([]);
    const [userGroup, setUserGroup] = useState<string[]>(getGroups(groups));
    const [loading,setLoading]=useState(true);
    let COMPANY_GROUPS:string[] = [];


    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
                setLoading(false);
                setCompanyGroups(data);
                setCompanyFilter(data);
                getAmountofGroups(data);
            }).catch(()=>{
            setCompanyGroups([]);
        })
    }

    //Create a Map<group,userPerGroup>
    const getAmountofGroups = (companyGroups:string[]) =>{
        companyGroups.forEach((groups)=> {
           let numberOfGroups = dataTable.filter(row =>{
               return getGroups(row.groups).includes(groups.toLowerCase());
           } ).length;
           groupPerPerson.set(groups,numberOfGroups);
        })
        console.log(groupPerPerson);
    }

    const filterCompanyGroups = () =>{
        console.log("Valor filtrado " + filterValue);
        if(filterValue.length != 0){
            setCompanyFilter(companyFilter.filter((item) => item.toLowerCase().includes(filterValue.toLowerCase())))
        }
        else{
            setCompanyFilter([...companyGroups]);
        }
    }

    useEffect(() => {
        getGroupsFromCompany()
    }, []);

    useEffect(() => {
        filterCompanyGroups();
    }, [filterValue]);

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
                companyFilter.map((groupFromCompany,index) =>(
                    <CheckBox
                        id={(getId(groupFromCompany,groups))}
                        key={index}
                        grupo={groupFromCompany}
                        handleChange={handleCheckBoxGroup}
                        checkedValue={userGroup}
                        groupSize={groupPerPerson.get(groupFromCompany)}
                         />
                )): <Spin/>}
            {!loading && companyFilter.length == 0 ? <NotFound message={'No se encontraron los grupos'}/>:''}
        </Flex>
    </>)
}