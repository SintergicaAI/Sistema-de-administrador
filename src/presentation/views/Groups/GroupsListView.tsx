import {Button, Layout, Spin} from "antd";
import {SquarePlus} from "lucide-react";
import {GroupsList} from "../../components/Groups/GroupsList.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import { useNavigate } from "react-router";
import {InputSearch} from "../../components/common";
import {useCallback, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {AddNewGroupToCompany} from "../../../application/use-cases/AddNewGroupToCompany.ts";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {GroupCreated} from "../../../domain/types/CompanyTypes.ts";
import { v4 as uuidv4 } from 'uuid';

const {Header, Content} = Layout;

const groupApi = new GroupApi();
const addNewGroup = new AddNewGroupToCompany(groupApi);

export const GroupsListView = () => {

    const {totalGroups,setActualGroupName, setAlertConfiguration, setShowAlert} = useGroupContext();
    const [filterValue, setFilterValue] = useState("");
    const navigate = useNavigate();

    const mutate = useMutation({
        mutationKey:["new group"],
        mutationFn: (data:GroupCreated) => addNewGroup.execute(data),
        onSuccess:( data,variables,context )=>{
            navigate(variables.groupKey);
            setActualGroupName("Nuevo grupo");
        },
        onError:()=>{
            setShowAlert(true);
            setAlertConfiguration({type:"error",message:"Error al crear el grupo",});
        },
        onSettled:()=>{
            setShowAlert(false);
        }
    })

    const handleClick = useCallback( ()=>{
        const newGroup: GroupCreated = {
            name:`nuevo grupo`,
            groupKey:`grupo-${uuidv4()}`
        }
        mutate.mutate(newGroup);
    },[])


    return (<Layout className='container-content' style={{display:'flex', flexDirection:'column'}}>
        <Spin fullscreen spinning={mutate.isPending}></Spin>
        <Header
            style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'}}
        >
            <Button type="primary"
                    onClick={handleClick}
                    icon={<SquarePlus style={{width:20, height:20}}/>}>
                Nuevo grupo
            </Button>

            <div style={{display: 'flex',gap:8}}>
                <p style={{marginBlock:0}}>{totalGroups} {`${totalGroups !=1 ? 'grupos': 'grupo'}`}</p>
                <div style={{minWidth:250}}>
                    <InputSearch placeholder={"Buscar grupos"} queryValue={filterValue} queryMethod={setFilterValue}/>
                </div>
            </div>
        </Header>
        <Content style={{flexGrow:1, marginTop:24}}>
              <GroupsList filterValue={filterValue}/>
        </Content>
    </Layout>)
}