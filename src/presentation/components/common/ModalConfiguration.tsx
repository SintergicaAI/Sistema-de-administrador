import {Modal } from 'antd';

export const ModalConfiguration = (
    {Content, isModalOpen,setIsModalOpen,Title}:
                                   {Content:React.ReactNode,
                                       isModalOpen:boolean,
                                       setIsModalOpen:React.Dispatch<any>,
                                       Title:string,
                                   }) =>{

    const handleOk = ()=>{
        setIsModalOpen(false);
    }
    const handleCancel = ()=>{
        setIsModalOpen(false);
    }
    return (<>
                <Modal title={Title}
                       open={isModalOpen}
                       onOk={handleOk}
                       onCancel={handleCancel}
                       okButtonProps={{style:{display: 'none'}}}>

                    {Content}
                </Modal>
            </>)
}