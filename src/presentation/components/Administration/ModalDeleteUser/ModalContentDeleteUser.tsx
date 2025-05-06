import {Dispatch, SetStateAction, useState} from "react";
import {useAdministration} from "../../../context/Administration";
import {DataType} from "../types/TableAdministrationTypes.ts";
import {DeleteUser} from "../../../../application/use-cases/DeleteUser.ts";
import {Button, Col, Flex, Row,Spin} from 'antd';
import {Avatar} from "../../common";
import { Trash2 } from 'lucide-react';
import { X } from 'lucide-react';
import {CompanyApi} from "../../../../infrastructure/api/CompanyApi.ts";
import {AlertConfigurationType} from "../../common/CommonTypes.ts";

const companyApi = new CompanyApi();
const deleteUser = new DeleteUser(companyApi);

type Props = {
    setIsModalOpen:Dispatch<SetStateAction<any>>;
    setAlertConfiguration:Dispatch<SetStateAction<AlertConfigurationType>>
    setShowAlert:Dispatch<SetStateAction<any>>;
}


export const ModalContentDeleteUser = ({
                                           setIsModalOpen,
                                           setShowAlert,
                                           setAlertConfiguration}:Props) =>{
    const {selectedRow,
        dataTable,
        changeDataTabla,
        changeHasSelected, setTotalItemsTable,totalItemsTable} = useAdministration();
    const [loading, setLoading] = useState(false);

    const {fullName} = selectedRow as DataType;

    const handleDelete =  ()=>{
        const {email} = selectedRow as DataType;
        setLoading(true);
        try{
            deleteUser.execute(email).then((deletedUser)=>{
                console.log('deletedUser',deletedUser);
                const newData = dataTable.filter((data)=>data.email !== deletedUser.email);
                console.log(newData.length);

                setTotalItemsTable( totalItemsTable - 1 )
                changeDataTabla(newData);
                changeHasSelected(false);
                setLoading(false);
                setIsModalOpen(false);
                setShowAlert(true);
            });
        }catch(e){
            setLoading(false);
            setIsModalOpen(false);
            setShowAlert(true);
            setAlertConfiguration({
                message:'Invitacion no enviada',
                description:"",
                type:'error'
            })
            console.error(e);
        }

    }
    return (
        <Row justify={'center'} align={'middle'} style={{minHeight:'180px'}}>
            <Col span={16}>
                <Flex vertical gap={16}>
                    <Spin spinning={loading} fullscreen/>
                    <Flex align={'center'} gap={5} justify={'center'}>
                        <Avatar name={`${fullName}`} type="active"/>
                        <p style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}>{`${fullName}`}</p>
                    </Flex>
                    <p
                        style={{color:'var(--c_slate_400)', textAlign:'center'}}
                    >Esta acción no se puede deshacer</p>
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
                            onClick={handleDelete}
                        >Si,eliminar usuario</Button>
                    </Flex>
                </Flex>
            </Col>
        </Row>
    )
}