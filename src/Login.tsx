import type { FormProps } from 'antd';
import {useState} from "react";
import {useNavigate} from "react-router";
import {MailOutlined,LockOutlined } from "@ant-design/icons"
import { Button, Form, Input,Typography,message} from 'antd';
import useFetch from "./hooks/useFetch.tsx";

type FieldType = {
    correo: string;
    contrasena: string;
    remember?: string;
};




function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();

    const [messageApi,contextHolder] = message.useMessage();

    const {Title} = Typography;

    let{data,hasError} = useFetch("clientes/login","POST",{})

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        /*Movernos al componente Home*/
        if(hasError){
            throw new Error("No se puedo acceder a los datos");
        }else{
            localStorage.setItem("usuario",JSON.stringify(data));
            console.log(data);
            navigation("/");
            return;
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        message.error('Mandaste de manera erronea tus datos');
        console.log(errorInfo);
    };

    return (
        <>
        <Form
            name="basic"
            layout="vertical"
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 30 }}
            className="form__container"
            style={{width:400}}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"

        >
            <Title>Login</Title>
            <Form.Item<FieldType>
                label="Ingresa correo electronico"
                name="correo"
                rules={[{ required: true},{type:"email"},{message: 'Favor de ingresar un email valido'}, {pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}]}
            >
                <Input prefix={<MailOutlined style={{color:"#01FAF5"}}/>} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="contrasena"
                rules={[{ required: true, message: 'Favor de ingresar una contraseña valida', min:5}]}
            >
                <Input.Password prefix={<LockOutlined style={{color:"#01FAF5"}}/>} value={password} onChange={e => setPassword(e.target.value)} placeholder="******"/>
            </Form.Item>

            {/*<Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>*/}

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Enviar
                </Button>
            </Form.Item>
        </Form>
    </>
    );
}
export default Login;