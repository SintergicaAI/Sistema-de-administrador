import {FormProps} from 'antd';
import {Flex, Form, Input, message, Typography} from 'antd';
import {useState} from "react";
import {MailOutlined,LockOutlined } from "@ant-design/icons"
import {SubmitButton} from "../components/common/SubmitButton.tsx";
import {useNavigate} from "react-router";
import {LogIn} from "../../application/use-cases/LogIn.ts";
import {AuthApi} from "../../infrastructure/api/AuthApi.ts";

type FieldType = {
    email: string;
    password: string;
    remember?: string;
};

//Aqui se hace la conexion entre los metodos implementados de AuthAPI y LogIn
const authApi = new AuthApi();
const logIn = new LogIn(authApi);

enum LoginStatusResponse {
    WRONG_PASSWORD = 401,
    DENIEND_ACCES = 404
}

function Login() {
    //Hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [form] = Form.useForm();

    //Ant Design components
    const [messageApi, contextHolder] = message.useMessage();
    const {Title} = Typography;


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        logIn.execute(values.email, values.password).then(() => {
                messageApi.open({
                    type: 'loading',
                    content: 'Iniciando sesion...',
                    duration: 3,
                }).then(() => navigate("/"))
            }
        ).catch((error:Response) => {
            let message = error.status ===
            LoginStatusResponse.WRONG_PASSWORD ? 'Contraseña incorrecta' : 'No tiene acceso'

            messageApi.open({
                type: 'error',
                content: message,
            });
        });
    }

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
                    name="email"
                    rules={[{ required: true,type:"email",message: 'Favor de ingresar un email valido', pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}]}
                >
                    <Input prefix={<MailOutlined className='icon-color'/>} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: 'Favor de ingresar una contraseña valida', min:6}]}
                >
                    <Input.Password prefix={<LockOutlined className='icon-color' />} value={password} onChange={e => setPassword(e.target.value)} placeholder="******"/>
                </Form.Item>

                    {/*<Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
        </Form.Item>*/}

                    <Form.Item label={null} labelCol={{span: 0}}>
                        {contextHolder}
                        <Flex justify="center">
                            <SubmitButton form={form} style={{width:120}}>Enviar</SubmitButton>
                        </Flex>
                    </Form.Item>

                    <p style={{textAlign:'center'}}>No tienes una cuenta? <a className='icon-color' style={{ textDecoration:'underline'}} href={'/register'}>Registrate</a></p>

                </Flex>
            </Form>
        </>
    );
}

export default Login;