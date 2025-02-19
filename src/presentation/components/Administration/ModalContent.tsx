import {Form, FormProps, Input,message,Alert} from "antd";
import { Mail } from 'lucide-react';
import {SubmitButton} from "../common/SubmitButton.tsx";
import {InvitationApi} from "../../../infrastructure/api/InvitationApi.ts";
import {SendInvitationEmail} from "../../../application/use-cases/SendInvitationEmail.ts";
import {useState} from "react";
import {AlertMessages} from "../common/AlertMessages.tsx";

type emailInput = string;

const invitationAPI = new InvitationApi();
const sendInvitationEmail = new SendInvitationEmail(invitationAPI);
export const ModalContent = ()=>{
    const [form] = Form.useForm();
    const [messageApi]= message.useMessage()
    const [showMessage, setShowMessage] = useState(false);
    const [alertConfiguration,setAlertConfiguarion] = useState({})

    const onFinish: FormProps<emailInput>['onFinish'] = (values) => {
        console.log(values);
        sendInvitationEmail.execute(values).
       then( (response) => {
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

    const onFinishFailed: FormProps<emailInput>['onFinishFailed'] = () => {
        messageApi.open({
            type: 'error',
            content: 'Ingresa el correo de manera correcta'
        });
    };

    return (<>
        <p>Ingresa el email del colaborador</p>
        <Form
            name="invitaton"
            labelCol={{ span: 6 }}
            wrapperCol={{ flex:1}}
            style={{ maxWidth: 600, marginBottom:'var(--base-space)'}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='inline'
            form={form}
        >
            <Form.Item<emailInput>
                label="Email"
                name="emailInput"
                rules={[
                    { required: true, message: 'Por favor ingresar un email valido' },
                    {type:'email', message: 'Este email no es valido',}]}
            >
                <Input type="email" prefix={<Mail color='var(--c_slate_500)' size='1rem' />} placeholder="juan@gmail.com"/>
            </Form.Item>

            <Form.Item>
                <SubmitButton form={form}>Invitar</SubmitButton>
            </Form.Item>
        </Form>

        {/*TODO:Componente que albergue varios tipos de mensaje*/}
        {
            showMessage && (<AlertMessages {...alertConfiguration} onClose={()=>{setShowMessage(false)}}/>)
        }


    </>)
}