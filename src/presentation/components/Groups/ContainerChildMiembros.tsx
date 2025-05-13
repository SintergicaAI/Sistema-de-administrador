import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {Flex, Spin} from "antd";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {getRole} from "../../utilities/getRole.ts";
import {useEffect} from "react";
import {GetGroupFromId} from "../../../application/use-cases/GetGroupFromId.ts";
import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";

const groupApi = new GroupApi();
const getGroupFromId = new GetGroupFromId(groupApi);
export const ContainerChildMiembros = () =>{

    const {membersGroup,setMembersGroup} = useGroupContext();

    const {groupId} = useParams();

    const {data, isPending, isError} = useQuery({
        queryKey:["members", groupId],
        queryFn: () => getGroupFromId.execute(groupId!)
    })

    useEffect(() => {
        if(data === undefined || "error" in data) return;

        // @ts-ignore
        const formatingData = data.userDTOS.map(user => {
            return {
                email: user.email,
                firstName: user.name,
                lastName: user.lastName,
                role: user.rol?.name,
                filterValue: ''
            }
        })
        setMembersGroup(formatingData);
    }, [data]);

    if(isPending){
        return (<Flex align="center" justify="center">
                <Spin spinning={isPending}></Spin>
            </Flex>)
    }

    if(isError){
        return (<p>No hay modelos asociados, da click en <span className='highlight-text'>Administrar miembros</span>, para cambiar agregar miembros</p>)
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