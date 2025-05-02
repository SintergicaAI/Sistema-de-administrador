import {Dispatch, SetStateAction} from "react";
import {Button, Col, Flex, Row} from "antd";
import {Trash2, X} from "lucide-react";
import {GroupApi} from "../../../../infrastructure/api/GroupApi.ts";
import {DeleteGroup} from "../../../../application/use-cases/DeleteGroup.ts";

type Props = {
    setIsModalOpen:Dispatch<SetStateAction<any>>;
}
const groupApi = new GroupApi();
const deleteGroup = new DeleteGroup(groupApi);
export const ModalDeleteGroupButton = ({setIsModalOpen}:Props)=>{

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
                <p>Desea eliminar el grupo?</p>
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