
import {Flex, FormProps, Space} from 'antd';
import { Form, Input,message } from 'antd';
import {ChangeEvent, useState} from "react";
import {SubmitButton} from "../../components/common";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";
import {SignIn} from "../../../application/use-cases/SignIn.ts";
import {Link, useNavigate} from "react-router"
import {RadioButton} from "../../components/common/RadioButton.tsx";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";

type FieldType = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    repeatPassword?: string;
    conditions:boolean
};

const authApi = new AuthApi();
const signIn = new SignIn(authApi);

const gapBetweenInput = 8;
type radioOptions =  'Acepto'| 'no';

const Label = ( ) =>{
    return (<p style={{marginBlock:0, color:"rgb(100,116,139)"}}>Aceptar <Link to="auth/login" style={{textDecoration:'underline'}}>términos y condiciones</Link></p>)
}


export const Register = () =>{
    //TODO:Try to do another approach for state management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [termsAccepted, setTermAccepted] = useState<radioOptions>('no');
    const [messageApi,contextHolder] = message.useMessage()
    const navigation = useNavigate();

    const [form] = Form.useForm();

    const screen = useBreakpoint();


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {

        messageApi.open({
            type:'loading',
            content:'Enviando datos...',
            duration:2
        })
        signIn.execute(values.firstName,values.lastName,values.email,values.password).then(() =>{
            messageApi.destroy();

            messageApi.open({
                type:'loading',
                content:'Iniciando sesión...',
                duration:2,
            }).then(()=>{
                navigation('/');
            })

        }).catch((error) => {
            messageApi.destroy();
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

    const handleRadioChange = (event:ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked){
            setTermAccepted('Acepto');
        }else{
            setTermAccepted('no');
        }
    }
    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 20}}
                wrapperCol={{span:27}}
                layout="vertical"
                style={{maxWidth:"100%"}}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                colon={false}
                requiredMark={false}
                labelAlign={'left'}
                form={form}

            >

                <div className='equal-space'>

                    <p style={{marginBlock:0}}>Ingresa los datos para terminar tu registro</p>

                    <Flex gap={gapBetweenInput} style={{width:'100%'}} className='register__label-wrapper'>
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
                    </Flex>

                    <Flex gap={gapBetweenInput} style={{width:"100%"}} className={'register__label-wrapper'}>
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
                    </Flex>


                    <div className='register__label-wrapper'>
                        <Form.Item<FieldType>
                            label="Correo electronico"
                            name="email"
                            rules={[{ required: true,type:"email",message: 'Favor de ingresar un email valido', pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}]}
                        >
                            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
                        </Form.Item>
                    </div>

                    <Form.Item<FieldType>
                        label={null} labelCol={{span: 0}}
                        name="conditions"
                        rules={[{required:true,message:'Debe de aceptar términos y condiciones'}]}
                    >
                    <div className='register__radio-wrapper'>
                        <Space direction="vertical" size="small" style={{width:'100%'}}>
                            <Label/>
                            <RadioButton
                                value={"Acepto"}
                                name={"terminos"}
                                isChecked={termsAccepted}
                                handleChange={handleRadioChange}/>
                        </Space>
                    </div>
                    </Form.Item>

                </div>




                <Form.Item label={null} labelCol={{span: 0}}>
                    {contextHolder}

                    <Flex justify={`${screen.lg ? 'left':'center'}`}>
                        <SubmitButton form={form}
                                      style={{width: screen.lg ? '200px':'350px'}}
                        >Registrarse</SubmitButton>
                    </Flex>

                </Form.Item>

            </Form>
        </>
    );
}