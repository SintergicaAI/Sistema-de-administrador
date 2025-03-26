import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AdministrationContext} from "../../context/Administration";
import {Flex,Spin} from "antd";
import {CheckBox} from "../common";
import {NotFound} from "../common/NotFound.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {AddUserToGroupCompany} from "../../../application/use-cases/AddUserToGroupCompany.ts";



type Props = {
    filterValue:string;
}

type groupItem = {
    id: string;
    name: string;
}
type SelectedProps ={
    groups:groupItem[];
    email:string;
}
const getGroups = (groups:groupItem[])=>{
    return groups.map(item=> item.name.toLowerCase());
}

const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);
const  addUserToGroupCompany = new AddUserToGroupCompany(companyAPI);
const copyGroupPerPerson = new Map<string, number>();

//TODO:Checking for memorization
export const CheckBoxGroup = ({filterValue}:Props)=>{
    const {selectedRow,changeSelectedRow,dataTable} = useContext(AdministrationContext);
    const {groups} = selectedRow as SelectedProps ;

    const [companyGroups, setCompanyGroups] = useState<string[]>([]);
    const [companyFilter, setCompanyFilter] = useState<string[]>([]);
    const [userGroup, setUserGroup] = useState<string[]>(getGroups(groups));
    const [groupsPerPerson,setGroupsPerPerson] = useState<Map<string,number>>(copyGroupPerPerson);
    const [loading,setLoading]=useState(true);


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
           copyGroupPerPerson.set(groups,numberOfGroups);
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
            setCompanyFilter(companyFilter.filter((item) => item.toLowerCase().includes(filterValue.toLowerCase())))
        }
        else{
            setCompanyFilter([...companyGroups]);
        }
    }

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) => {
        if(value.target.checked)
        {
            changeSelectedRow(
                {...selectedRow,
                    groups:[...groups,{name:value.target.value}]}
            );

            const newUserGroups = [...userGroup, value.target.value];

            //Actualizamos los grupos del usuario
            setUserGroup( newUserGroups);
            updateAmountPerGroups(value.target.value, 1);

            //Realizamos la peticion al backend para que actualize los grupos
            const {email} = selectedRow as SelectedProps
            addUserToGroupCompany.execute(
                email,
                newUserGroups.map((item) =>item.toUpperCase())
            ).then(()=>{
                console.log(`new users groups ${newUserGroups}`);
            }).catch((reason) =>{
                console.log(`We have problems because of ${reason}`);
            });
        }
        else{
            const numero = [...groups].findIndex((item:groupItem)=> item.name.toLowerCase() === value.target.value.toLowerCase());
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
        setUserGroup(getGroups(groups));
    }, [groups]);

    return (<>
        <Flex gap={5} flex="1" vertical>
            {!loading?
                companyFilter.map((groupFromCompany,index) =>(
                    <CheckBox
                        key={index}
                        grupo={groupFromCompany}
                        handleChange={handleCheckBoxGroup}
                        checkedValue={userGroup}
                        groupSize={groupsPerPerson.get(groupFromCompany)}
                         />
                )): <Spin/>}
            {!loading && companyFilter.length == 0 ? <NotFound message={'No se encontraron los grupos'}/>:''}
        </Flex>
    </>)
}