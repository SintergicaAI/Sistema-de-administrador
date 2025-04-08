
import {Flex, FormProps} from 'antd';
import { Form, Input,Typography,message } from 'antd';
import { useState} from "react";
import {SubmitButton} from "../../components/common/SubmitButton.tsx";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";
import {SignIn} from "../../../application/use-cases/SignIn.ts";
import {useNavigate} from "react-router"
type FieldType = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword?: string;
};

const authApi = new AuthApi();
const signIn = new SignIn(authApi);

export const Register = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [messageApi,contextHolder] = message.useMessage()
    const navigation = useNavigate();

    const [form] = Form.useForm();

    const {Title} = Typography;

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        signIn.execute(values.firstName,values.lastName,values.email,values.password).then(() =>{
            messageApi.open({
                type:'loading',
                content:'Registrando datos...',
                duration:3,
            }).then(()=>{
                navigation('/');
            })

        }).catch((error) => {
            console.log(error);
            messageApi.open({
                type:'error',
                content:'Tus datos no se enviaron correctamente',
                duration:5,
            })
        })

    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        messageApi.open({
            type:'error',
            content:'Ingresa los campos de manera correcta'
        });
    };

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 30}}
                style={{ maxWidth: 350 }}
                layout="horizontal"
                className='form__container'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                labelWrap
                colon={false}
                labelAlign={'left'}
                form={form}

            >
                <Title style={{textAlign:'center', marginBlockEnd:'2.2rem'}}>Registro</Title>
                <Form.Item<FieldType>
                    label="Nombre(s)"
                    name="firstName"
                    rules={[{ required: true, message: 'Ingresa el campo correcto!'}, {pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ' -]{1,40}$/, message: "No se permiten caracteres especiales y numeros"}]}
                >
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Nombre(s)"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Apellidos"
                    name="lastName"
                    rules={[{ required: true, message: 'Ingresa el campo correcto' }, {pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ' -]{1,40}$/, message: "No se permiten caracteres especiales y numeros"}] }
                >
                    <Input value={secondName} onChange={(e) => setSecondName(e.target.value)} placeholder="Apellidos"/>
                </Form.Item>

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
                    rules={[{ required: true, message: 'Contrasena menor a 6 caracteres', min:6 , }]}
                >
                    <Input.Password placeholder='Min 6 caracteres'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
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
                    <Input.Password placeholder='Min 6 caracteres' data-testid="repeat-password-input"/>
                </Form.Item>


                <Form.Item label={null} labelCol={{span: 0}}>
                    {contextHolder}
                    <Flex justify='center'>
                        <SubmitButton form={form} style={{width:120}}>Enviar</SubmitButton>
                    </Flex>
                </Form.Item>
                <p style={{textAlign:'center'}}>Ya tienes una cuenta? <a className='icon-color' style={{ textDecoration:'underline'}} href={'/login'}>Inicia sesión</a></p>
            </Form>
        </>
    );
}