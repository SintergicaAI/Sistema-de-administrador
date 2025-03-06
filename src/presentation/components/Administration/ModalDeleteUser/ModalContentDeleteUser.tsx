import {Dispatch, SetStateAction, useContext} from "react";
import {AdministrationContext} from "../../../context/Administration";
import {DataType} from "../types/TableAdministrationTypes.ts";
//import {CompanyApi} from "../../../../infrastructure/api/CompanyApi.ts";
import {DeleteUser} from "../../../../application/use-cases/DeleteUser.ts";
import {Button, Col, Flex, Row} from 'antd';
import {Avatar} from "../../common/Avatar.tsx";
import { Trash2 } from 'lucide-react';
import { X } from 'lucide-react';
import {LocalOperation} from "../../../../infrastructure/api/LocalOperation.ts";

const companyApi = new LocalOperation();
const deleteUser = new DeleteUser(companyApi);

type Props = {
    setIsModalOpen:Dispatch<SetStateAction<any>>;
}


export const ModalContentDeleteUser = ({setIsModalOpen}:Props) =>{
    const {selectedRow,dataTable,setDataTabla,changeHasSelected} = useContext(AdministrationContext);
    const {fullName} = selectedRow as DataType;

    const handleDelete = async ()=>{
        const {id} = selectedRow as DataType;
        try{
            const deletedUser = await deleteUser.execute(id);
            console.log('deletedUser',deletedUser);
            const newData = dataTable.filter((data)=>data.id !== deletedUser.email);
            console.log(newData.length);
            setDataTabla(newData);
            changeHasSelected(false);
            setIsModalOpen(false);
        }catch(e){
            console.log(e);
        }

    }
    return (
        <Row justify={'center'} align={'middle'} style={{minHeight:'180px'}}>
            <Col span={16}>
                <div >
                    <Flex align={'center'} gap={5} justify={'center'}>
                        <Avatar name={`${fullName}`}/>
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
                </div>
            </Col>
        </Row>
    )
}