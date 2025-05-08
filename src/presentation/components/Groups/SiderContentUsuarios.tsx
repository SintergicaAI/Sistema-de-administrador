import {InputSearch} from "../common";
import {Button, Flex, Spin} from "antd";
import {CheckBoxesMiembros} from "./CheckBoxesMiembros.tsx";
import {useState} from "react";
import {Download} from "lucide-react";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {AvatarUserInfo} from "./GroupsTypes.ts";
import {useParams} from "react-router";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import {AddMultipleUsersToGroup} from "../../../application/use-cases/AddMultipleUsersToGroup.ts";


const getUsersEmails = (listUsers:AvatarUserInfo[]) =>{
    return listUsers.map((user:AvatarUserInfo)=> user.email);
}
const groupApi = new GroupApi();
const addMultipleUsersToGroup = new AddMultipleUsersToGroup(groupApi);

//Todo: implement a customHook to general functions on SiderContent
export const SiderContentUsuarios = () => {
    const [filterValue,setFilterValue] = useState("");
    const [notDisabled, setNotDisabled] = useState(false);
    const {membersGroup,setAlertConfiguration, setShowAlert} = useGroupContext();
    const [prevItems, setPrevItems] = useState(membersGroup);
    const [loading, setLoading] = useState(false);

    const {groupId} = useParams();

    if(membersGroup !== prevItems) {
        setPrevItems(membersGroup);
        setNotDisabled(true);
    }

    const onClick = async () => {
        setLoading(true);
        let  id = groupId ?? ""
        try{
            await addMultipleUsersToGroup.execute(id,getUsersEmails(membersGroup));
            setAlertConfiguration({type:'success',message:"Acción guardada"})
        }catch (error){
            setAlertConfiguration({type:'error',message:"Acción no guardada, inténtelo más tarde"})
        }finally {
            setLoading(false);
            setShowAlert(true);
        }
    }
    return (
        <div className='sider-content'>
            <Spin fullscreen spinning={loading}></Spin>
            <p className='sider-paragraph'>Usuarios</p>

            <Flex gap={16} vertical>
                <InputSearch placeholder='buscar' searchMethod={setFilterValue}></InputSearch>
                <CheckBoxesMiembros filterValue={filterValue}/>
                <Button type='primary'
                        icon={<Download/>}
                        onClick={onClick}
                        disabled={!notDisabled}
                >
                    Guardar cambios
                </Button>
            </Flex>
        </div>
    )
}