import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AdministrationContext} from "../../context/Administration";
import {Flex,Spin} from "antd";
import {NotFound} from "../common/NotFound.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {AddUserToGroupCompany} from "../../../application/use-cases/AddUserToGroupCompany.ts";
import {UserRole} from "../../../domain/enums/UserRole.ts";
import {getGroupId, getGroupNameFromId, getGroupNameInLowerCase, getGroupsNames} from "../../utilities";
import {GroupType} from "../../../domain/types/CompanyTypes.ts";
import {GroupCheckboxContainer} from "./GroupCheckboxContainer.tsx";



type Props = {
    filterValue:string;
}

type SelectedProps ={
    groups:GroupType[];
    email:string;
    role:string
}

const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);
const copyGroupPerPerson = new Map<string, number>();
let companyGroups:GroupType[] = [];

const getDataAttributesFromCheckbox = (groupsUser:string[]) =>{
    const dataAttributesGroups:string[] = []
    groupsUser.forEach(item =>{
        const value = document.querySelector(`[data-value="${item}"]`);
        if(value) dataAttributesGroups.push(value.getAttribute("data-value") as string);
    })
    return dataAttributesGroups;
}

//TODO:Refactoring
export const CheckBoxGroups = ({filterValue}:Props)=>{
    const {selectedRow,changeSelectedRow,dataTable} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps ;

    const [companyFilter, setCompanyFilter] = useState<GroupType[]>([]);
    const [userGroup, setUserGroup] = useState<string[]>(getGroupsNames(groups));
    const [groupsPerPerson,setGroupsPerPerson] = useState<Map<string,number>>(copyGroupPerPerson);
    const [loading,setLoading]=useState(true);


    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
                setLoading(false);
                companyGroups = [...data]
                console.log(companyGroups);
                setCompanyFilter(companyGroups);
                getAmountForGroups(data);
            }).catch(()=>{
            setCompanyFilter([]);
        })
    }


    //Initialize groupsPerPerson<group,number>
    const getAmountForGroups = (companyGroups:GroupType[]) =>{
        companyGroups.forEach((groups)=> {
           let numberOfGroups = dataTable.filter(row =>{
               if(typeof row.groups !== 'undefined'){
                   return getGroupNameInLowerCase(row.groups).includes(groups.name.toLowerCase());
                }
               } ).length;
           copyGroupPerPerson.set(groups.group_id,numberOfGroups);
        })
        console.log(copyGroupPerPerson);
        setGroupsPerPerson(new Map(copyGroupPerPerson));
    }

    //Update groupsPerPerson<group,number>
    const updateAmountPerGroups = (key:string, newValue:number) =>{
        const previousValue = copyGroupPerPerson.get(key) as number;
        copyGroupPerPerson.set(key,previousValue + newValue);
        setGroupsPerPerson(new Map(copyGroupPerPerson));
    }

    const filterCompanyGroups = () =>{
        if(filterValue.length != 0){
            setCompanyFilter(companyFilter.filter((item) => item.name.toLowerCase().includes(filterValue.toLowerCase())))
        }
        else{
            setCompanyFilter([...companyGroups]);
        }
    }



    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) => {
        let newUserGroups:string[] = [];
        if(value.target.checked)
        {
                const checkboxValue = value.target.value;
                changeSelectedRow(
                    {...selectedRow,
                        groups:[...groups,{name:getGroupNameFromId(checkboxValue,groups), group_id:checkboxValue}]}
                );

                newUserGroups = [...userGroup, checkboxValue];

                //Actualizamos los grupos del usuario
                setUserGroup( newUserGroups);
                updateAmountPerGroups(checkboxValue, 1);
        }
        else{
            const numero =
                [...groups].findIndex((item:GroupType)=> item.group_id.toLowerCase() === value.target.value.toLowerCase());
            changeSelectedRow(
                {...selectedRow,
                    groups:[...groups.filter((_, index) => index !== numero)]}
            );
            setUserGroup( (prevState) => prevState.filter(item => item.toLowerCase() !== value.target.value.toLowerCase()));
            updateAmountPerGroups(value.target.value, -1);
        }
    }

    useEffect(() => {
        getGroupsFromCompany()
    }, []);

    useEffect(() => {
        filterCompanyGroups();
    }, [filterValue]);

    //Actualizar la lista de grupos del usuario si cambiamos a otro usuario
    useEffect(() => {
        setUserGroup(getGroupId(groups));
    }, [groups]);



    const isDisable = (role === UserRole.OWNER ) || (role === UserRole.ADMIN )
    return (<>
        <Flex gap={5} flex="1" vertical>
            {!loading?
                companyFilter.map((groupFromCompany,index) =>(
                    <GroupCheckboxContainer
                        key={index}
                        value={groupFromCompany}
                        handleChange={handleCheckBoxGroup}
                        checkedValue={userGroup}
                        groupSize={groupsPerPerson.get(groupFromCompany.group_id)}
                        isDisabled={isDisable}
                         />
                )): <Spin/>}
            {!loading && companyFilter.length == 0 ? <NotFound message={'No se encontraron los grupos'}/>:''}
        </Flex>
    </>)
}