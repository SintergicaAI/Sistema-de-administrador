import {GetInformationOfGroups} from "../../../application/use-cases/GetInformationOfGroups.ts";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {useEffect, useMemo} from "react";
import {GetGroupDTO} from "../../../domain/types/CompanyTypes.ts";
import {CardData} from "./GroupsTypes.ts";
import {GroupCard} from "./GroupCard.tsx";
import {NotFoundGroups} from "./NotFoundGroups.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {Spin} from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import {filterData} from "../../utilities/filteringData.ts";
import {useQuery} from "@tanstack/react-query";

const groupApi = new GroupApi();
const getInformationFromGroups = new GetInformationOfGroups(groupApi);

const cleanData = (data:GetGroupDTO[]| undefined):CardData[]=>{

    if(!data) return [];

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

    const {data,isPending, isError} = useQuery({
        queryKey:['groups'],
        queryFn: () => getInformationFromGroups.execute()
    })

    const groups = useMemo(()=>{
        return cleanData(data);
    }, [data]);

    useEffect(() => {
        setTotalGroups(groups.length);
    }, [groups]);

    const filteredData = useMemo(()=>{
        return filterData<CardData>(filterValue,groups);
    },[filterValue,groups]);


    if(isPending){
        return (
            <div style={{display:'grid', placeContent:'center', minHeight:'100%'}}>
                <Spin indicator={<LoadingOutlined spin />} size="large" />
            </div>
        )
    }

    if(isError){
        return (<NotFoundGroups />)
    }

    if (filteredData.length > 0) {
        return (
            <section style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px' }}>
                {filteredData.map((item) => (
                    <GroupCard key={item.groupId} {...item} />
                ))}
            </section>
        );
    } else {
        return <NotFoundGroups />;
    }
}