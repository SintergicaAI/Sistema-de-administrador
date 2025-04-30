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


const companyApi = new CompanyApi();
const geAllUserCompany = new GetAllUserCompanyData(companyApi);
let inmutableData:AvatarUserInfo[] = [];

export const CheckBoxesMiembros = () =>{

    const {setMembersGroup,membersGroup,filterValue} = useGroupContext();
    const [checkedValues, setCheckedValues] = useState<string[]>(membersGroup.map(member => member.email));
    const [loading, setLoading] = useState(true);
    const [listUsersFromCompany, setListUsersFromCompany] = useState<AvatarUserInfo[]>([]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        if(target.checked){
            setMembersGroup([...membersGroup,
                (inmutableData.find(item => item.email === target.value) as AvatarUserInfo)]);
            setCheckedValues([...checkedValues,target.value]);
        }else{
            const uncheckedValue = target.value;
           setMembersGroup([...membersGroup.filter(member => member.email !== uncheckedValue)]);
           setCheckedValues([...checkedValues.filter(value => value !== uncheckedValue)]);
        }
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
                            labelComponent={<AvatarWithName fullName={`${member.firstName} ${member.lastName}`}/>}
                            objectValue={{value: member.email, name:""}}
                            checkedValue={checkedValues}
                            handleChange={handleCheckBoxGroup}/>
                    )) : <p>Usuarios no existentes</p>
            }
        </Flex>
    )
}