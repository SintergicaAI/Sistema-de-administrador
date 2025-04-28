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
let inmutableData:CardData[] | [] = [];

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

    const {setTotalGroups,filterValue} = useGroupContext();
    const [groups,setGroups] = useState<CardData[]|null>(null);

    const filteringData = ()=>{
        if(filterValue.length != 0){
            const filtered
                = groups?.filter(item => item.nameGroup.toLowerCase().includes(filterValue.toLowerCase())) ?? []
            setGroups(filtered);
        }
        else{
            setGroups([...inmutableData])
        }
    }

    useEffect(()=>{
        getData().then((res)=>{
            const formattedData = cleanData(res);
            inmutableData=formattedData;
            setGroups(formattedData);
            setTotalGroups(formattedData.length);
        }).catch(()=>{
            setGroups([])
        })
    },[])

    useEffect(() => {
        filteringData();
    }, [filterValue]);

    if(groups === null){
        return (
            <div style={{display:'grid', placeContent:'center'}}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        )
    }

    return (<>

        {
        (groups.length > 1) ?
            (
            <section style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px'}}>
            {
                groups.map((item, index)=>(
                        <GroupCard key={index} {...item}/>
                    ))
            }
            </section>
            )
            : <NotFoundGroups />
        }
    </>
    )
}