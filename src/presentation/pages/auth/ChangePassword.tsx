import {useState} from "react";
import {Flex, Form, FormProps, Input, message} from "antd";
import {SubmitButton} from "../../components/common";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";
import {ChangePassword as Change} from "../../../application/use-cases/ChangePassword.ts";
import {useNavigate} from "react-router";
type FieldType = {
    password: string;
    repeatPassword?: string;
}

const authApi = new AuthApi();
const changePassword = new Change(authApi);


export const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        const {password} = values;
        messageApi.open({
            type:'loading',
            content:'Enviando correo',
            duration:1
        }).then(() =>{
            changePassword.execute(password).then(() => {
                    messageApi.open({
                        type:'success',
                        content:"Contraseña cambiada con éxito",
                        duration:2
                    }).then(()=> navigate('/auth') )
                })
            })

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
        messageApi.open({
            type:'error',
            content:'Error al enviar los datos, intente más tarde',
        })
    };

    return (
        <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout={'vertical'}
        style={{ maxWidth: "500px",
            padding:"var(--base-space)",
            backgroundColor:'#fff',
            boxShadow:"0px 0px 20px 5px #e3e3e3",
            marginInline:'auto',
            borderRadius:'var(--base-radius)'}}
        >
            {contextHolder}
            <h1>Nueva contraseña</h1>
            <p>Ingresa tu nueva contraseña</p>

            <Flex gap={10} vertical>
                <Form.Item<FieldType>
                    label="Nueva contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Contrasena menor a 6 caracteres', min:6 , }]}
                >
                    <Input.Password placeholder='Min 6 caracteres'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    data-testid="password-input"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Repetir contraseña"
                    name="repeatPassword"
                    dependencies={['password']}

                    rules={[{ required: true, message:"Favor de confirmar contrasena"},
                        {min:6,message:'Contrasena menor a 6 caracteres'},
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('La contrasena no coincide'));
                            },
                        })
                    ]}
                >
                    <Input.Password
                        placeholder='Min 6 caracteres'
                        visibilityToggle={false}
                        data-testid="repeat-password-input"/>
                </Form.Item>
            </Flex>

            <Form.Item label={null} labelCol={{span: 0}}>
                <Flex justify="center">
                    <SubmitButton
                        form={form}
                        style={{width:"100%", color:'#fff'}}>Guardar contraseña</SubmitButton>
                </Flex>
            </Form.Item>
        </Form>
    )
}