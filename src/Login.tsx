import type { FormProps } from 'antd';
import {useState} from "react";
import { Button, Checkbox, Form, Input, Flex} from 'antd';
import "./styles/login.css";

/*Url del servidor*/
const serverUrl:string = "http://192.168.3.245:8080/";

type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);


    try{

        const response = await fetch(`${serverUrl}usuarios/obtenerTodosLosUsuarios`);

        if(response.status !== 200){
            throw new Error(response.statusText);
        }
        const result = await response.json();
        console.log(result);
    }catch(err){
        console.log(err);
    }

};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};





const baseStyle: React.CSSProperties = {
    width: '90%',
    maxWidth:"1220px",
    backgroundColor:"white",
    borderRadius:"10px",
    padding:"10px",
};

function Login():any{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <>
            <Flex vertical={true} justify="center"  align={"center"} style={{...baseStyle}}>
                <Form
                    name="basic"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 16 }}
                    style={{maxWidth:1000}}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"

                >
                    <h1 className={"form__title"}>Login</h1>
                    <Form.Item<FieldType>
                        label="Ingresa correo electronico"
                        name="email"
                        rules={[{ required: true,type:"email",message: 'Favor de ingresar un email valido' }]}
                    >
                        <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Favor de ingresar tu contraseña' }]}
                    >
                        <Input.Password  value={password} onChange={e => setPassword(e.target.value)} placeholder="******"/>
                    </Form.Item>

                    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item label={null}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
        </Flex>
    </>
    );
}
export default Login;