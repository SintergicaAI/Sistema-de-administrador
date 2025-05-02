import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {Flex} from "antd";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import {GetInformationOfGroups} from "../../../application/use-cases/GetInformationOfGroups.ts";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {useParams} from "react-router";
import {useEffect} from "react";
import {getRole} from "../../utilities/getRole.ts";

const groupApi = new GroupApi();
const getInformationOfGroups = new GetInformationOfGroups(groupApi);
export const ContainerChildMiembros = () =>{

    const {membersGroup,setMembersGroup} = useGroupContext();
    const {nameGroup} = useParams();

    const getGroups = ()=>{
        getInformationOfGroups.execute()
            .then((res) =>{
                const groupDTO =
                    res.find(group => group.name.toLowerCase() === nameGroup?.toLowerCase()) ;
                if(typeof groupDTO == "undefined") return;

                setMembersGroup(groupDTO.users.map(user => {
                    return {
                        email: user.email,
                        firstName: user.name,
                        lastName: user.lastName,
                        role:user.rol.name
                    }
                }))
            })
            .catch(() => {
                setMembersGroup([])
            })
    }

    useEffect(() => {
        getGroups();
    }, []);


    return (
        <>
            {membersGroup.length> 0 ? <Flex vertical gap={5}>
                {membersGroup.map(member =>
                    (
                        <Flex key={member.email} justify='space-between'
                              align='center'
                              style={{backgroundColor:"var(--c_slate_50)",
                                  borderRadius:'var(--sm-radius)',
                                  padding:'var(--base-space)'  }}>
                            <AvatarWithName fullName={`${member.firstName} ${member.lastName}`}/>
                            <p>{getRole(member.role)}</p>
                        </Flex>
                    )
                )}
            </Flex>:<p>No hay modelos asociados, da click en <span className='highlight-text'>Administrar miembros</span>, para cambiar agregar miembros</p>}
        </>
    );
}