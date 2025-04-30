
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {GetInformationOfGroups} from "../../../application/use-cases/GetInformationOfGroups.ts";
import {Flex} from "antd";
import {ChangeEvent, useEffect, useState} from "react";
import {useParams} from "react-router";
import {UserFromGroup} from "../../../domain/types/CompanyTypes.ts";
import {CheckboxContainer} from "../common";
import {AvatarWithName} from "../common/AvatarWithName.tsx";


const companyApi = new GroupApi();
const getInformationofGroups = new GetInformationOfGroups(companyApi);


export const CheckBoxesMiembros = () =>{

    const {nameGroup} = useParams();
    const [membersGroup,setMembersGroup] = useState<UserFromGroup[]>([]);
    const [checkedValues, setCheckedValues] = useState<string[]>([]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{

    }

    useEffect(() => {
        getInformationofGroups.execute()
            .then((res) =>{
                const groupDTO =
                    res.find(group => group.name.toLowerCase() === nameGroup?.toLowerCase()) ;
                if(typeof groupDTO == "undefined") return;

                setMembersGroup(groupDTO.users);
                setCheckedValues([...groupDTO.users.map((item => item.email))])
            })
            .catch(error => {
                console.log(error);
                setMembersGroup([]);
            });
    }, []);

    return (
        <Flex vertical gap={8}>
            {
                membersGroup.length > 0 ?
                    membersGroup.map((member) => (
                        <CheckboxContainer
                            labelComponent={<AvatarWithName fullName={`${member.name} ${member.lastName}`}/>}
                            objectValue={{value: member.email, name:""}}
                            checkedValue={checkedValues}
                            handleChange={handleCheckBoxGroup}/>
                    )) : <p>Usuarios no existentes</p>
            }
        </Flex>
    )
}