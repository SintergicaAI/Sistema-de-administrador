import {GetInformationOfGroups} from "../../../application/use-cases/GetInformationOfGroups.ts";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {useEffect, useState} from "react";
import {GetGroupDTO} from "../../../domain/types/CompanyTypes.ts";
import {CardData} from "./GroupsTypes.ts";
import {GroupCard} from "./GroupCard.tsx";
import {NotFoundGroups} from "./NotFoundGroups.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';

const groupApi = new GroupApi();
const getInformationFromGroups = new GetInformationOfGroups(groupApi);

const getData = async ()=>{
    return await getInformationFromGroups.execute();
}
const cleanData = (data:GetGroupDTO[])=>{
    return data.map((item:GetGroupDTO) => {
        return {
            nameGroup: item.name,
            userCreatorName: `${ item.userCreator.name} ${item.userCreator.lastName}`,
            members: item.users.length,
            size:32.2
        }
    })
}

const ContainerGroup = ({listGroups}:{listGroups:CardData[]})=>{
    return (
        <section style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px'}}>
            {
                listGroups?.length ? listGroups.map((item, index)=>(
                        <GroupCard key={index} {...item}/>
                    )) :
                    '' }
        </section>
    )
}

export const GroupsList = ()=>{
    const [listGroups, setListGroups] = useState<CardData[]|null>(null);

    const {setTotalGroups} = useGroupContext();
    useEffect(()=>{
        getData().then((res)=>{
            const formattedData = cleanData(res);
            setListGroups(formattedData)
            setTotalGroups(formattedData.length);
        }).catch(()=>{
            setListGroups([])
        })
    },[])

    if(listGroups === null){
        return (
            <div style={{display:'grid', placeContent:'center'}}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        )
    }

    return (<>
        {
        (listGroups.length > 1) ?  <ContainerGroup listGroups={listGroups}/>: <NotFoundGroups />
        }
    </>

    )
}