import {Flex, Form, FormProps, Input, message} from "antd";
import {useState} from "react";
import {SubmitButton} from "../../components/common";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";
import {ForgotPassword as Forgot} from "../../../application/use-cases/ForgotPassword.ts";

type FieldType = {
    email: string;
}

const authApi = new AuthApi();
const forgotPassword = new Forgot(authApi);

export const ForgotPassword = ()=>{

    const [email, setEmail] = useState("");
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const {email} = values;
        messageApi.open({
           type:'loading',
           content:'Enviando correo',
            duration:1
       }).then(() =>{
            forgotPassword.execute(email).then( () => {
                messageApi.open({
                    type:'success',
                    content:'Verifique su correo',
                    duration:5
                })
        })

        })

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
       messageApi.open({
           type:'error',
           content:'Error al enviar datos, intente más tarde',
       })
    };

    return (
        <Form
        name="changePassword"
        layout={"vertical"}
        requiredMark={false}
        style={{ maxWidth: "500px",
            padding:"var(--base-space)",
            backgroundColor:'#fff',
            boxShadow:"0px 0px 20px 5px #e3e3e3",
            marginInline:'auto',
            borderRadius:'var(--base-radius)'}}
        autoComplete="off"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        >
            {contextHolder}
            <h1>Cambio de contraseña</h1>
            <p>Ingresa tu correo electrónico para proceder</p>

            <Form.Item<FieldType>
                label="Correo electrónico"
                name="email"
                rules={[
                    { required: true,type:"email",message: 'Favor de ingresar un email valido', pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}
                ]}
            >
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            </Form.Item>

            <Form.Item label={null} labelCol={{span: 0}}>
                <Flex justify="center">
                    <SubmitButton
                        form={form}
                        style={{width:"100%", color:'#fff'}}>Enviar correo</SubmitButton>
                </Flex>
            </Form.Item>
        </Form>
    )
}