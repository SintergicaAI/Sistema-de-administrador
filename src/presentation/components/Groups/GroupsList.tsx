import {GetInformationOfGroups} from "../../../application/use-cases/GetInformationOfGroups.ts";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {useEffect, useState} from "react";
import {GetGroupDTO} from "../../../domain/types/CompanyTypes.ts";
import {CardData} from "./GroupsTypes.ts";
import {GroupCard} from "./GroupCard.tsx";
import {NotFoundGroups} from "./NotFoundGroups.tsx";

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
export const GroupsList = ()=>{
    const [listGroups, setListGroups] = useState<CardData[]>();

    useEffect(()=>{
        getData().then((res)=>{
            const formattedData = cleanData(res);
            setListGroups(formattedData)
        })
    },[])

    return (
        <section style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px'}}>
            {
                listGroups?.length ? listGroups.map((item, index)=>(
                    <GroupCard key={index} {...item}/>
                )) :
                    <NotFoundGroups /> }
        </section>
    )
}