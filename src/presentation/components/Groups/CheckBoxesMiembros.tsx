
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {GetInformationOfGroups} from "../../../application/use-cases/GetInformationOfGroups.ts";
import {Flex} from "antd";
import {ChangeEvent, useEffect, useState} from "react";
import {useParams} from "react-router";
import {AvatarUserInfo} from "../../../domain/types/CompanyTypes.ts";
import {CheckboxContainer} from "../common";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import { Spin } from 'antd';


const groupApi = new GroupApi();
const companyApi = new CompanyApi();
const getInformationOfGroups = new GetInformationOfGroups(groupApi);
const geAllUserCompany = new GetAllUserCompanyData(companyApi);
let allUsersFromCompany:AvatarUserInfo[] = [];

export const CheckBoxesMiembros = () =>{

    const {nameGroup} = useParams();
    const {setMembersGroup,membersGroup} = useGroupContext();
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
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

    const getGroups = async ()=>{
        await getInformationOfGroups.execute()
            .then((res) =>{
                const groupDTO =
                    res.find(group => group.name.toLowerCase() === nameGroup?.toLowerCase()) ;
                if(typeof groupDTO == "undefined") return;

                setMembersGroup(groupDTO.users);
                setCheckedValues([...groupDTO.users.map((item => item.email))])
            })
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
                }
            })

        })
    }

    useEffect(() => {

        Promise.all([getGroups(),getUsers()])
            .catch(()=>{
                setMembersGroup([]);
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