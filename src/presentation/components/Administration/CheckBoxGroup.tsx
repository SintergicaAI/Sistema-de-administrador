import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AdministrationContext} from "../../context/Administration";
import {Flex,Spin} from "antd";
import {CheckBox} from "../common";
import {NotFound} from "../common/NotFound.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {AddUserToGroupCompany} from "../../../application/use-cases/AddUserToGroupCompany.ts";
import {UserRole} from "../../../domain/enums/UserRole.ts";
import {getGroupsNames} from "../../utilities/getGroupsName.ts";
import {GroupType} from "../../../domain/types/CompanyTypes.ts";



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
const  addUserToGroupCompany = new AddUserToGroupCompany(companyAPI);
const copyGroupPerPerson = new Map<string, number>();
let companyGroups:GroupType[] = [];

//TODO:Checking for memorization and Refactoring
export const CheckBoxGroup = ({filterValue}:Props)=>{
    const {selectedRow,changeSelectedRow,dataTable} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as SelectedProps ;

    /*const [companyGroups, setCompanyGroups] = useState<GroupType[]>([]);*/
    const [companyFilter, setCompanyFilter] = useState<GroupType[]>([]);
    const [userGroup, setUserGroup] = useState<string[]>(getGroupsNames(groups));
    const [groupsPerPerson,setGroupsPerPerson] = useState<Map<string,number>>(copyGroupPerPerson);
    const [loading,setLoading]=useState(true);


    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
                setLoading(false);
                companyGroups = [...data]
                setCompanyFilter(data);
                getAmountofGroups(data);
            }).catch(()=>{
            setCompanyFilter([]);
        })
    }

    //Create a Map<group,userPerGroup>
    const getAmountofGroups = (companyGroups:GroupType[]) =>{
        companyGroups.forEach((groups)=> {
           let numberOfGroups = dataTable.filter(row =>{
               if(typeof row.groups !== 'undefined'){
                   return getGroupsNames(row.groups).includes(groups.name.toLowerCase());
                }
               } ).length;
           copyGroupPerPerson.set(groups.name,numberOfGroups);
        })
        setGroupsPerPerson(new Map(copyGroupPerPerson));
    }

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

    const getDataAttributesFromCheckbox = (groupsUser:string[]) =>{
         const dataAttributesGroups:string[] = []
        groupsUser.forEach(item =>{
            const value = document.querySelector(`[data-value="${item}"]`);
            if(value) dataAttributesGroups.push(value.getAttribute("data-value") as string);
        })
        return dataAttributesGroups;
    }

    const sendNewGroups = (newUserGroups:string[]) =>{
        const {email} = selectedRow as SelectedProps
        addUserToGroupCompany.execute(
            email,
            newUserGroups.map((item) =>item)
        ).then(()=>{
            console.log(`new users groups ${newUserGroups}`);
        }).catch((reason) =>{
            console.log(`We have problems because of ${reason}`);
        });
    }

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) => {
        const promises:Promise<boolean>[] = []

        if(value.target.checked)
        {
            //Envolverlo en
            changeSelectedRow(
                {...selectedRow,
                    groups:[...groups,{name:value.target.value}]}
            );

            const newUserGroups = [...userGroup, value.target.value];

            //Actualizamos los grupos del usuario
            setUserGroup( newUserGroups);
            updateAmountPerGroups(value.target.value, 1);


            //Obtenemos los dataAttributos de los grupos seleccionados
            const data = getDataAttributesFromCheckbox(newUserGroups);
            //console.log(data);

            //Realizamos la peticion al backend para que actualize los grupos

            //sendNewGroups(newUserGroups);
        }
        else{
            const numero = [...groups].findIndex((item:GroupType)=> item.name.toLowerCase() === value.target.value.toLowerCase());
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
        setUserGroup(getGroupsNames(groups));
    }, [groups]);


    const isDisable = (role === UserRole.OWNER ) || (role === UserRole.ADMIN )
    return (<>
        <Flex gap={5} flex="1" vertical>
            {!loading?
                companyFilter.map((groupFromCompany,index) =>(
                    <CheckBox
                        key={index}
                        grupo={groupFromCompany.name}
                        handleChange={handleCheckBoxGroup}
                        checkedValue={userGroup}
                        groupSize={groupsPerPerson.get(groupFromCompany.name)}
                        isDisabled={isDisable}
                         />
                )): <Spin/>}
            {!loading && companyFilter.length == 0 ? <NotFound message={'No se encontraron los grupos'}/>:''}
        </Flex>
    </>)
}