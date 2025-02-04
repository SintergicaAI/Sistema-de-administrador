import type {FormProps} from 'antd';
import {useState} from "react";
import {MailOutlined,LockOutlined } from "@ant-design/icons"
import { Form, Input,Typography,message} from 'antd';
import {Flex} from 'antd';
import {SubmitButton} from "./generalComponents/Form";
import {useNavigate} from "react-router";
import {sendData} from "./functions/Forms";
import {BASE_URL,LOGIN_ENDPOINT} from "./functions/Forms"

type FieldType = {
    email: string;
    password: string;
    remember?: string;
};





function Login(){
    //Hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [form] = Form.useForm();
    //React router function
    const navigation = useNavigate();

    //Ant Design components
    const [messageApi,contextHolder] = message.useMessage();
    const {Title} = Typography;


    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        messageApi.open({
            type:'loading',
            content:'Iniciando sesion...',
            duration:0,
        })
        console.log("Datos enviados", values);

        sendData(values,`${BASE_URL}${LOGIN_ENDPOINT}`).then((data) =>{
            console.log("Successful send ", data);
            localStorage.setItem("user", JSON.stringify("usuario",data));

            if(data.exitoso){
                messageApi.destroy();
                navigation("/");
            }else{
                messageApi.destroy();
                messageApi.open({
                    type:"error", content:"El usuario que ingresaste no existe", duration:5
                })
            }
        })
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        messageApi.open({
            type:'error',
            content:'Ingresa los campos de manera correcta'
        });
        console.log(errorInfo);
    };

    return (
        <>
        <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 16 }}
            wrapperCol={{ span: 30 }}
            className="form__container"
            style={{width:300,minHeight:300,paddingBlock:30}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            form={form}
        >
            <Title style={{textAlign:'center',} }>Login</Title>
            <Flex vertical={true} gap={10}>

                <Form.Item<FieldType>
                    label="Correo electronico"
                    name="email"
                    rules={[{ required: true,type:"email",message: 'Favor de ingresar un email valido', pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}]}
                >
                    <Input prefix={<MailOutlined className='icon-color'/>} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Contrasena"
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
                    <SubmitButton form={form}>Enviar</SubmitButton>
                </Form.Item>
            </Flex>
        </Form>
    </>
    );
}
export default Login;