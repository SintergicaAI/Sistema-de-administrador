import {ChangeEvent, useEffect, useState} from "react";
import {useAdministration} from "../../context/Administration";
import {Flex,Spin} from "antd";
import {NotFound} from "../common/NotFound.tsx";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {UserRole} from "../../../domain/enums/UserRole.ts";
import {
    getGroupBasicInfo,
    getGroupId,
    getGroupNameFromId,
    getGroupNameInLowerCase,
    getGroupsNames
} from "../../utilities";
import {GroupBasicInfo} from "../../../domain/types/CompanyTypes.ts";
import {CheckboxContainer} from "../common";
import {LabelComponent} from "./LabelComponent.tsx";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";



type Props = {
    filterValue:string;
}

type SelectedPropsType ={
    groups:GroupBasicInfo[];
    email:string;
    role:string
}

const groupApi = new GroupApi();
const getGroupCompany = new GetCompanyGroups(groupApi);
const copyGroupPerPerson = new Map<string, number>();
let companyGroups:GroupBasicInfo[] = [];

//TODO:Refactoring
export const CheckBoxGroups = ({filterValue}:Props)=>{
    const {selectedRow,changeSelectedRow,dataTable} = useAdministration();
    const {groups,role} = selectedRow as SelectedPropsType ;

    const [companyFilter, setCompanyFilter] = useState<GroupBasicInfo[]>([]);
    const [userGroup, setUserGroup] = useState<string[]>(getGroupsNames(groups));
    const [groupsPerPerson,setGroupsPerPerson] = useState<Map<string,number>>(copyGroupPerPerson);
    const [loading,setLoading]=useState(true);


    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
                setLoading(false);
                companyGroups = getGroupBasicInfo(data);
                setCompanyFilter(companyGroups);
                getAmountForGroups(companyGroups);
            }).catch(()=>{
            setCompanyFilter(companyGroups);
        })
    }


    //Initialize groupsPerPerson<group,number>
    const getAmountForGroups = (companyGroups:GroupBasicInfo[]) =>{
        companyGroups.forEach((groups)=> {
           let numberOfGroups = dataTable.filter(row =>{
               if(typeof row.groups !== 'undefined'){
                   return getGroupNameInLowerCase(row.groups).includes(groups.name.toLowerCase());
                }
               } ).length;
           copyGroupPerPerson.set(groups.group_id,numberOfGroups);
        })
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
                [...groups].findIndex((item:GroupBasicInfo)=> item.group_id.toLowerCase() === value.target.value.toLowerCase());
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
            {!loading ?
                companyFilter.map((groupFromCompany,index) =>(
                    <CheckboxContainer
                        key={index}
                        labelComponent={<LabelComponent name={groupFromCompany.name} />}
                        objectValue={{name:groupFromCompany.name,value:groupFromCompany.group_id}}
                        handleChange={handleCheckBoxGroup}
                        checkedValue={userGroup}
                        extraInfo={`${groupsPerPerson.get(groupFromCompany.group_id)} miembros`}
                        isDisabled={isDisable}
                         />
                )): <Spin/>}
            {!loading && companyFilter.length == 0 ? <NotFound message={'No se encontraron los grupos'}/>:''}
        </Flex>
    </>)
}