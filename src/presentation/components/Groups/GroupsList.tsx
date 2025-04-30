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
import {filteringData} from "../../utilities/filteringData.ts";

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
            size:32.2,
            filterValue:item.name
        }
    })
}


export const GroupsList = ()=>{

    const {setTotalGroups,filterValue} = useGroupContext();
    const [groups,setGroups] = useState<CardData[]>([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        getData().then((res)=>{
            const formattedData = cleanData(res);
            inmutableData=formattedData;
            setGroups(formattedData);
            setTotalGroups(formattedData.length);
        }).catch(()=>{
            setGroups([])
        }).finally(()=>{
            setLoading(false);
        })
    },[])

    useEffect(() => {
        const filter = filteringData<CardData>(filterValue,groups,inmutableData);
        setGroups(filter);
    }, [filterValue]);

    if(loading){
        return (
            <div style={{display:'grid', placeContent:'center', minHeight:'100%'}}>
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