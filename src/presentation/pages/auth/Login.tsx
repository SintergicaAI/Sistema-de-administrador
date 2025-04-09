import {FormProps,Typography} from 'antd';
import {Flex, Form, Input, message} from 'antd';
import {useState} from "react";
import {SubmitButton} from "../../components/common";
import {Link, useNavigate} from "react-router";
import {LogIn} from "../../../application/use-cases/LogIn.ts";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";

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

const {Title} = Typography
function Login() {
    //Hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [messageApi, contextHolder] = message.useMessage();


    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        messageApi.open({
            type:'loading',
            content:'Enviando datos...',
            duration:2
        })

        logIn.execute(values.email, values.password).then(() => {
                messageApi.open({
                    type: 'loading',
                    content: 'Iniciando sesion...',
                    duration: 2,
                }).then(() => navigate("/"))
            }
        ).catch((error:Response) => {
            messageApi.destroy();
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
            <Form
                name="basic"
                layout="vertical"
                labelCol={{span: 16}}
                wrapperCol={{span: 30}}
                className="form__container login-form"
                initialValues={{remember: true}}
                onFinish={onFinish}
                requiredMark={false}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                form={form}
            >
                <Flex gap={40} vertical>

                    <div className='login-text__wrapper'>
                        <Title level={2} style={{fontSize:20}}>¡Bienvenido de nuevo!</Title>
                        <p>Inicia sesión con tus credenciales para continuar</p>
                    </div>

                    <div className='login-input__wrapper'>
                        <Form.Item<FieldType>
                            label="Correo electronico"
                            name="email"
                            rules={[{ required: true,type:"email",message: 'Favor de ingresar un email valido', pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}]}
                        >
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            label="Contraseña"
                            name="password"
                            rules={[{ required: true, message: 'Favor de ingresar una contraseña valida', min:6}]}
                        >
                            <Input.Password  value={password} onChange={e => setPassword(e.target.value)} placeholder="******"/>
                        </Form.Item>
                    </div>

                    <div className='login-buttons__wrapper'>
                        <Link to="/register">
                            <p>Olvidaste tu contraseña?</p>
                        </Link>

                        <Form.Item label={null} labelCol={{span: 0}}>
                            {contextHolder}
                            <Flex justify="center">
                                <SubmitButton form={form} style={{width:"100%"}}>Iniciar sesión</SubmitButton>
                            </Flex>
                        </Form.Item>
                    </div>
                </Flex>

            </Form>
    );
}

export default Login;