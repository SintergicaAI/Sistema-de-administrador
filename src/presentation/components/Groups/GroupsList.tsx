import {GetInformationOfGroups} from "../../../application/use-cases/GetInformationOfGroups.ts";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {useEffect, useMemo, useState} from "react";
import {GetGroupDTO} from "../../../domain/types/CompanyTypes.ts";
import {CardData} from "./GroupsTypes.ts";
import {GroupCard} from "./GroupCard.tsx";
import {NotFoundGroups} from "./NotFoundGroups.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import {filterData} from "../../utilities/filteringData.ts";

const groupApi = new GroupApi();
const getInformationFromGroups = new GetInformationOfGroups(groupApi);

const cleanData = (data:GetGroupDTO[]):CardData[]=>{
    return data.map((item:GetGroupDTO) => {
        return {
            groupId:item.group_id,
            nameGroup: item.name,
            userCreatorName: `${ item.userCreator.name} ${item.userCreator.lastName}`,
            members: item.users.length,
            size:32.2,
            filterValue:item.name.toLowerCase(),
        }
    })
}


export const GroupsList = ({filterValue}:{filterValue:string})=>{

    const {setTotalGroups} = useGroupContext();
    const [groups,setGroups] = useState<CardData[]>([]);
    const [loading,setLoading] = useState(true);

    const filteredData = useMemo(()=>{
        return filterData<CardData>(filterValue,groups);
    },[filterValue,groups]);


    const getData =  ()=>{
        getInformationFromGroups.execute().then((res)=>{
            const formattedData = cleanData(res);
            setGroups(formattedData);
            setTotalGroups(formattedData.length);
        }).catch((error)=>{
            console.log(error)
            setGroups([])
        }).finally(()=>{
            setLoading(false);
        });
    }
    useEffect(()=>{
        getData();
    },[])

    if(loading){
        return (
            <div style={{display:'grid', placeContent:'center', minHeight:'100%'}}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        )
    }

    return (<>

        {
        (filteredData.length > 1) ?
            (
            <section style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'8px'}}>
            {
                filteredData.map((item, index)=>(
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