import type { FormProps } from 'antd';
import {useState} from "react";
import {useNavigate} from "react-router";
import { Button, Form, Input} from 'antd';


/*Url del servidor*/
const serverUrl:string = "http://192.168.3.245:8080/";


type FieldType = {
    correo: string;
    contrasena: string;
    remember?: string;
};
type ResponseBackend = {
    exitoso:boolean,
    mensaje:string,
    token:string
}

export const obtenerListaUsuarios = async (token:string)=> {
    try{
       const response = await fetch(`${serverUrl}clientes/listar`,{
           method: 'GET',
           headers: {
               Authorization:`Bearer ${token}`
           }
       });
        console.log(localStorage.getItem("usuario"));

       if(!response.ok){
           throw new Error(response.statusText);
       }

        return response.json();
    }
    catch (error){
        console.error(error);
    }
}

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();

    //Se ejecuta una vez cuando se renderiza el componente
   /* useEffect(()=>{
        const sesion = localStorage.getItem("usuario")  ??"sin valores";
        console.log(sesion);
    },[]);*/

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values);
        /*Movernos al componente Home*/

        const {correo,contrasena} = values;
        try{

            const response = await fetch(`${serverUrl}clientes/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({correo,contrasena})
            });

            if(response.status !== 200){
                throw new Error(response.statusText);
            }
            const result:ResponseBackend = await response.json();
            /*Comprobar el resultado del backend*/
            if(result.exitoso){

                /*Guardar en el local storage*/
                let token = result.token;
                localStorage.setItem("usuario",JSON.stringify({correo,token}));


                console.log(result);

                /*Redirigir a Home*/
                navigation("/")
                return;

                /*let listaUsuarios = await obtenerListaUsuarios(result.token);
                console.log(listaUsuarios);*/
            }

        }catch(err){
            console.log(err);
        }

    };
    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
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
            <h1 className={"form__title"}>Login</h1>
            <Form.Item<FieldType>
                label="Ingresa correo electronico"
                name="correo"
                rules={[{ required: true,type:"email",message: 'Favor de ingresar un email valido', pattern:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/}]}
            >
                <Input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="juan@gmail.com"/>
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="contrasena"
                rules={[{ required: true, message: 'Favor de ingresar una contraseña valida', min:6}]}
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