import {Flex} from "antd";
import {ChangeEvent, useEffect, useState} from "react";
import {AvatarUserInfo} from "../../../domain/types/CompanyTypes.ts";
import {CheckboxContainer} from "../common";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import { Spin } from 'antd';


const companyApi = new CompanyApi();
const geAllUserCompany = new GetAllUserCompanyData(companyApi);
let allUsersFromCompany:AvatarUserInfo[] = [];

export const CheckBoxesMiembros = () =>{

    const {setMembersGroup,membersGroup} = useGroupContext();
    const [checkedValues, setCheckedValues] = useState<string[]>(membersGroup.map(member => member.email));
    const [loading, setLoading] = useState(true);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        if(target.checked){
            setMembersGroup([...membersGroup,
                (allUsersFromCompany.find(item => item.email === target.value) as AvatarUserInfo)]);
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
            allUsersFromCompany = users.map(user =>{
                return{
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role:user.role
                }
            })

        })
    }

    useEffect(() => {
        getUsers()
            .catch(()=>{
                allUsersFromCompany = [];
            })
            .finally(()=>{
            setLoading(false);
        })
    }, []);

    if(loading){
        return (<>
            <Spin spinning={loading}></Spin>
            </>)
    }

    return (
        <Flex vertical gap={8}>
            {
                allUsersFromCompany.length > 0 ?
                    allUsersFromCompany.map((member) => (
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