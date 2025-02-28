import {Form, FormProps, Input, message, ConfigProvider, Select, Flex} from "antd";
import {SubmitButton} from "../../common/SubmitButton.tsx";
import {InvitationApi} from "../../../../infrastructure/api/InvitationApi.ts";
import {SendInvitationEmail} from "../../../../application/use-cases/SendInvitationEmail.ts";
import {useState} from "react";
import {AlertMessages} from "../../common/AlertMessages.tsx";
import { Send } from 'lucide-react';

type FieldType = {
    email: string,
    username: string,
    TextArea:string,
};

const invitationAPI = new InvitationApi();
const sendInvitationEmail = new SendInvitationEmail(invitationAPI);
export const ModalContentInviteUser = ()=>{
    const [form] = Form.useForm();
    const [messageApi]= message.useMessage()
    const [showMessage, setShowMessage] = useState(false);
    const [alertConfiguration,setAlertConfiguarion] = useState({})

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log(values);
        sendInvitationEmail.execute(values.email).
       then( () => {
            //console.log('Response:', response);
            setShowMessage(true);
            setAlertConfiguarion({
                ...alertConfiguration,
                message:'Invitacion enviada',
                description:'La invitacion se ha enviado exitosamente',
                type:'success'
            })
       })
           .catch((error)=>{
               setShowMessage(true);
               setAlertConfiguarion({
                   ...alertConfiguration,
                   message:'Invitacion no enviada',
                   description:error.message,
                   type:'error'
               })
               console.log(error);
           })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
        messageApi.open({
            type: 'error',
            content: 'Ingresa el correo de manera correcta'
        });
    };

    return (<>
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

                <Form.Item<FieldType>
                    label="Nombre del usuario"
                    name="username"
                    rules={[
                        { required: true, message: 'Por favor ingresar un email valido' }
                    ]}
                >
                    <Input type="text" placeholder="Juan..."/>
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

        {/*TODO:Componente que albergue varios tipos de mensaje*/}
        {
            showMessage && (<AlertMessages {...alertConfiguration} onClose={()=>{setShowMessage(false)}}/>)
        }


    </>)
}