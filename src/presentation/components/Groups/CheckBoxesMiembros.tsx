import {Flex} from "antd";
import {ChangeEvent, useEffect, useState} from "react";
import {AvatarUserInfo} from "./GroupsTypes.ts";
import {CheckboxContainer} from "../common";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import { Spin } from 'antd';
import {filteringData} from "../../utilities/filteringData.ts";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {AddUserToGroup} from "../../../application/use-cases/AddUserToGroup.ts";
import {useParams} from "react-router";


const companyApi = new CompanyApi();
const groupApi = new GroupApi();
const geAllUserCompany = new GetAllUserCompanyData(companyApi);
const addUserToGroup = new AddUserToGroup(groupApi);

let inmutableData:AvatarUserInfo[] = [];

export const CheckBoxesMiembros = ({filterValue}:{filterValue:string}) =>{

    const {setMembersGroup,membersGroup, setAlertConfiguration, setShowAlert} = useGroupContext();
    const {groupId} = useParams();
    const [checkedValues, setCheckedValues] = useState<string[]>(membersGroup.map(member => member.email));
    const [loading, setLoading] = useState(true);
    const [listUsersFromCompany, setListUsersFromCompany] = useState<AvatarUserInfo[]>([]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        const emailFromUser = target.value;
        const id = groupId ?? "";
        if(target.checked){
            setMembersGroup([...membersGroup,
                (inmutableData.find(item => item.email === target.value) as AvatarUserInfo)]);
            setCheckedValues([...checkedValues,target.value]);

            setLoading(true);
            addUsers(id,emailFromUser).then(()=>{
              setAlertConfiguration({type:'success',message:"Usuario agregado"})
            }).catch(()=>{
                console.log("No se pudo agregar el usuario");
                uncheckUser(emailFromUser);
            }).finally(()=>{
                setLoading(false);
                setShowAlert(true);
            });

        }else{
            uncheckUser(emailFromUser);
        }
    }

    const uncheckUser = (uncheckedValue:string)=>{
        setMembersGroup([...membersGroup.filter(member => member.email !== uncheckedValue)]);
        setCheckedValues([...checkedValues.filter(value => value !== uncheckedValue)]);
    }

    const getUsers = async ()=>{
        await geAllUserCompany.execute({})
        .then((res) =>{
            const {users} = res;
            inmutableData = users.map(user =>{
                return{
                    email: user.email,
                    firstName: user.firstName as string,
                    lastName: user.lastName as string,
                    role:user.role,
                    filterValue: `${user.firstName} ${user.lastName}`
                }
            })
            setListUsersFromCompany(inmutableData);
        })
    }

    const addUsers =  async (groupId:string,email:string)=>{
       const res =  await addUserToGroup.execute(groupId,email);
       if("error" in res){
           setAlertConfiguration({type:'error',message:res.error})
          throw new Error(res.error);
       }
        return res;
    }

    useEffect(() => {
        getUsers()
            .catch(()=>{
                inmutableData = [];
            })
            .finally(()=>{
            setLoading(false);
        })
    }, []);

    useEffect(() => {
        const filter = filteringData<AvatarUserInfo>(filterValue,listUsersFromCompany,inmutableData);
        setListUsersFromCompany(filter);
    }, [filterValue]);

    if(loading){
        return (<>
            <Spin spinning={loading}></Spin>
            </>)
    }

    return (
        <Flex vertical gap={8}>
            {
                listUsersFromCompany.length > 0 ?
                    listUsersFromCompany.map((member) => (
                        <CheckboxContainer
                            key={member.email}
                            labelComponent={<AvatarWithName fullName={`${member.firstName} ${member.lastName}`}/>}
                            objectValue={{value: member.email, name:""}}
                            checkedValue={checkedValues}
                            handleChange={handleCheckBoxGroup}/>
                    )) : <p>Usuarios no existentes</p>
            }
        </Flex>
    )
}