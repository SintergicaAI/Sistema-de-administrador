import {Form, FormProps, Input, message, ConfigProvider, Select, Flex, Spin} from "antd";
import {SubmitButton} from "../../common";
import {Dispatch, SetStateAction, useState} from "react";
import { Send } from 'lucide-react';
import {AddNewUserToCompany} from "../../../../application/use-cases/AddNewUserToCompany.ts";
import {InvitationApi} from "../../../../infrastructure/api/InvitationApi.ts";
import {AlertConfigurationType} from "../../common/CommonTypes.ts";

type FieldType = {
    email: string,
    TextArea:string,
};
type Props = {
    setIsModalOpen:Dispatch<SetStateAction<any>>;
    setInvitationSend:Dispatch<SetStateAction<any>>;
    setAlertConfiguration:Dispatch<AlertConfigurationType>;
}



const invitationApi = new InvitationApi();
//TODO: verificar tiempo de carga de addNewUserToCompany
const addNewUser = new AddNewUserToCompany(invitationApi);

export const ModalContentInviteUser = ({
                                           setIsModalOpen,
                                           setAlertConfiguration,
                                           setInvitationSend}:Props)=>{
    const [form] = Form.useForm();
    const [messageApi]= message.useMessage()
    const [loading,setLoading] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log(values);
        setLoading(true);
        addNewUser.execute(values.email).
       then( () => {
            setIsModalOpen(false);
            setInvitationSend(true);
       })
           .catch((error)=>{
               setAlertConfiguration({
                   message:'Invitacion no enviada',
                   description:error.message,
                   type:'error'
               })
               console.log(error);
           }).finally(()=>{
               setLoading(false);
        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
        messageApi.open({
            type: 'error',
            content: 'Ingresa el correo de manera correcta'
        });
    };

    return (<>
        <Spin spinning={loading} fullscreen/>
        <ConfigProvider theme={{
            components:{
                Form:{
                    labelColor:'#94A3B8',
                },
            }
        }}
        >
            <Form
                name="invitaton"
                wrapperCol={{ flex:1}}
                style={{ maxWidth: 600, marginBottom:'var(--base-space)', fontWeight:300}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
                layout="vertical"
            >
                <Form.Item<FieldType>
                    label="Correo del usuario"
                    name="email"
                    rules={[
                        { required: true, message: 'Por favor ingresar un email valido' },
                        {type:'email', message: 'Este email no es valido',}]}
                >
                    <Input type="email" placeholder="ejemplo@mail.com"/>
                </Form.Item>

                <Form.Item label='Rol'>
                    <Select defaultValue={'Usuario'}
                            options={[
                                {value:'usuario',label:'Usuario'},
                                {value:'administrador',label:'Administrador'},
                            ]}
                            style={{ width: '100%' }}
                    />
                </Form.Item>


                <Form.Item<FieldType>
                    label="Mensaje de invitacion"
                    name="TextArea"
                >
                    <Input.TextArea  style={{height: '120px', resize:'none'}} />
                </Form.Item>

                <Flex justify='flex-end'>
                    <SubmitButton
                        form={form}
                        icon={<Send/>}
                    >Enviar invitación</SubmitButton>
                </Flex>
            </Form>
        </ConfigProvider>
    </>)
}