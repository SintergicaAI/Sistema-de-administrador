import type { FormProps } from 'antd';
import {useEffect, useState} from "react";
import { Button, Checkbox, Form, Input} from 'antd';
import "./styles/login.css";

/*Url del servidor*/
const serverUrl:string = "http://192.168.3.245:8080/";

type FieldType = {
    correo?: string;
    contrasena?: string;
    /*remember?: string;*/
};
type ResponseBackend = {
    exitoso:boolean,
    mensaje:string
}



const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    try{

        const response = await fetch(`${serverUrl}usuarios/acceder`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        });

        if(response.status !== 200){
            throw new Error(response.statusText);
        }
        const result:ResponseBackend = await response.json();

        /*Comprobar el resultado del backend*/
        if(result.exitoso){
            /*Realizar una paginacion*/

            /*Guardar en el local storage*/
            localStorage.setItem("usuario",JSON.stringify(values));
        }
        else{
            /*Mostrar mensaje de error*/
        }
        console.log(result);
    }catch(err){
        console.log(err);
    }

};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};






/*const baseStyle: React.CSSProperties = {
    width: '90%',
    maxWidth:"1220px",
    backgroundColor:"white",
    borderRadius:"10px",
    padding:"10px",
};*/

function Login():any{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        const sesion = localStorage.getItem("usuario") ?? "sin valores";
        console.log(sesion);
    },[]);

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
            <h1 className={"form__title"}>Login</h1>
            <Form.Item<FieldType>
                label="Ingresa correo electronico"
                name="correo"
                rules={[{ required: true,type:"email",message: 'Favor de ingresar un email valido' }]}
            >
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="contrasena"
                rules={[{ required: true, message: 'Favor de ingresar tu contraseña' }]}
            >
                <Input.Password  value={password} onChange={e => setPassword(e.target.value)} placeholder="******"/>
            </Form.Item>

            {/*<Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>*/}

            <Form.Item label={null}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </>
    );
}
export default Login;