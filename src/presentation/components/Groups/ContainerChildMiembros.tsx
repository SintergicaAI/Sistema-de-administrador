import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {Flex, Spin} from "antd";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {getRole} from "../../utilities/getRole.ts";
import {useEffect, useState} from "react";
import {GetGroupFromId} from "../../../application/use-cases/GetGroupFromId.ts";
import {useParams} from "react-router";

const groupApi = new GroupApi();
const getGroupFromId = new GetGroupFromId(groupApi);
export const ContainerChildMiembros = () =>{

    const {membersGroup,setMembersGroup} = useGroupContext();

    const {groupId} = useParams();

    const [loading,setLoading] = useState(true);

    const getMembersOfGroup = ()=> {
        const id = groupId ?? "";
        getGroupFromId.execute(id)
            .then((group) => {

            if ("error" in group) {
                setMembersGroup([]);
                return;
            }
                setLoading(false);
                setMembersGroup(group.userDTOS.map(user => {
                return {
                    email: user.email,
                    firstName: user.name,
                    lastName: user.lastName,
                    role: user.rol?.name,
                    filterValue: ''
                }
            }));
        }).catch((error) => {
            console.error(error);
            setMembersGroup([]);
            setLoading(false);
        })
    }

    useEffect(() => {
        getMembersOfGroup();
    }, []);

    if(loading){
        return (<Flex align="center" justify="center">
                <Spin spinning={loading}></Spin>
            </Flex>)
    }

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