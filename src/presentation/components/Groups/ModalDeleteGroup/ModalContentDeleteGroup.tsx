import {Dispatch, SetStateAction, useState} from "react";
import {Button, Col, Flex, Row, Spin} from "antd";
import {Trash2, X} from "lucide-react";
import {GroupApi} from "../../../../infrastructure/api/GroupApi.ts";
import {DeleteGroup} from "../../../../application/use-cases/DeleteGroup.ts";
import {useParams} from "react-router";
import {useGroupContext} from "../../../context/Group/useGroupContext.ts";


type Props = {
    setIsModalOpen:Dispatch<SetStateAction<any>>;
    setShowAlert:Dispatch<SetStateAction<any>>;
    setAlertConfiguration:Dispatch<SetStateAction<any>>
}

const space = 16;

const groupApi = new GroupApi();
const deleteGroup = new DeleteGroup(groupApi);
export const ModalDeleteGroupButton = ({
                                           setIsModalOpen,
                                           setAlertConfiguration,
                                           setShowAlert}:Props)=>{

    const {groupId} = useParams();
    const {actualGroupName} = useGroupContext();
    const [loading,setLoading] = useState(false);

    const handleDeleteGroup = () => {
        const id = groupId ?? "";
        setLoading(true);
        deleteGroup.execute(id).then(()=>{
            setLoading(false);
            setIsModalOpen(false);
        }).catch((err)=>{
            console.log(err)
            setAlertConfiguration({type:"error",message:"Error en la petición, inténtelo después"});
            setLoading(false);
        }).finally(()=>{
            setShowAlert(true);
        })
    }

   /* const simulatedDelete = ()=>{
            setLoading(true);
        setTimeout(()=>{
            setLoading(false);
            setIsModalOpen(false);
            setAlertConfiguration({type:"error",message:"Error en la petición, inténtelo después"});
            setShowAlert(true);
        },1000)
    }*/

    return (
        <Row justify={'center'} align={'middle'} style={{minHeight:'180px'}}>
            <Col span={16}>
                <Spin spinning={loading} fullscreen/>
                <Flex gap={8} vertical align={'center'} justify={'center'} style={{marginBottom:space}}>
                    <p style={{fontWeight:600}}>{actualGroupName}</p>
                    <p
                        style={{color:'var(--c_slate_400)', textAlign:'center'}}
                    >Esta acción no se puede deshacer</p>
                </Flex>
                <Flex gap={8}>

                    <Button type='primary'
                            icon={<Trash2/>}
                            iconPosition={'start'}
                            onClick={() => {setIsModalOpen(false)}}
                    >Cancelar acción</Button>
                    <Button
                        color='danger'
                        icon={<X/>}
                        iconPosition={'start'}
                        variant='outlined'
                        onClick={handleDeleteGroup}
                    >Si,eliminar usuario</Button>
                </Flex>
            </Col>
        </Row>
    )
}