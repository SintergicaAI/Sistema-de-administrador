import {Dispatch, SetStateAction} from "react";
import {Button, Col, Flex, Row} from "antd";
import {Trash2, X} from "lucide-react";
import {GroupApi} from "../../../../infrastructure/api/GroupApi.ts";
import {DeleteGroup} from "../../../../application/use-cases/DeleteGroup.ts";
import {useParams} from "react-router";

type Props = {
    setIsModalOpen:Dispatch<SetStateAction<any>>;
}

const space = 16;

const groupApi = new GroupApi();
const deleteGroup = new DeleteGroup(groupApi);
export const ModalDeleteGroupButton = ({setIsModalOpen}:Props)=>{

    const {nameGroup} = useParams();

    const handleDeleteGroup = () => {
        deleteGroup.execute("Hola").then(()=>{
            setIsModalOpen(false);
        }).catch((err)=>{
            console.log(err)
        })
    }

    return (
        <Row justify={'center'} align={'middle'} style={{minHeight:'180px'}}>
            <Col span={16}>
                <Flex gap={8} vertical align={'center'} justify={'center'} style={{marginBottom:space}}>
                    <p style={{fontWeight:600}}>{nameGroup}</p>
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