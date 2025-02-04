import type {FormProps} from 'antd';
import {Flex, Form, Input, message, Typography} from 'antd';
import {useState} from "react";
import {LockOutlined, MailOutlined} from "@ant-design/icons"
import {SubmitButton} from "./generalComponents/Form";
import {useNavigate} from "react-router";
import {LogIn} from "./application/use-cases/LogIn.ts";
import {AuthApi} from "./infrastructure/api/AuthApi.ts";

type FieldType = {
    correo: string;
    contrasena: string;
    remember?: string;
};


const authApi = new AuthApi();
const logIn = new LogIn(authApi);

function Login() {
    //Hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [form] = Form.useForm();

    //Ant Design components
    const [messageApi, contextHolder] = message.useMessage();
    const {Title} = Typography;

    //let{data,hasError} = useFetch("clientes/login","POST",{})

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        logIn.execute(values.correo, values.contrasena).then(() => {
                messageApi.open({
                    type: 'loading',
                    content: 'Iniciando sesion...',
                    duration: 3,
                }).then(() => navigate("/"))
            }
        ).catch(error => {
            messageApi.open({
                type: 'error',
                content: error.message
            });
        });
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        messageApi.open({
            type: 'error',
            content: 'Ingresa los campos de manera correcta'
        });
        console.log(errorInfo);
    };

    return (
        <>
            <Form
                name="basic"
                layout="vertical"
                labelCol={{span: 16}}
                wrapperCol={{span: 30}}
                className="form__container"
                style={{width: 300, minHeight: 300, paddingBlock: 30}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                form={form}
            >
                <Title style={{textAlign: 'center',}}>Login</Title>
                <Flex vertical={true} gap={10}>

                    <Form.Item<FieldType>
                        label="Correo electronico"
                        name="correo"
                        rules={[{
                            required: true,
                            type: "email",
                            message: 'Favor de ingresar un email valido',
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        }]}
                    >
                        <Input prefix={<MailOutlined className='icon-color'/>} type="email" value={email}
                               onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Contrasena"
                        name="contrasena"
                        rules={[{required: true, message: 'Favor de ingresar una contraseña valida', min: 6}]}
                    >
                        <Input.Password prefix={<LockOutlined className='icon-color'/>} value={password}
                                        onChange={e => setPassword(e.target.value)} placeholder="******"/>
                    </Form.Item>

                    {/*<Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>*/}

                    <Form.Item label={null} labelCol={{span: 0}}>
                        {contextHolder}
                        <SubmitButton form={form}>Enviar</SubmitButton>
                    </Form.Item>
                </Flex>
            </Form>
        </>
    );
}

export default Login;