
import type { FormProps } from 'antd';
import { Button, Form, Input,Typography,Flex } from 'antd';

type FieldType = {
    email?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
    repeatPassword?: string;
};

export const Register = () =>{

    const {Title} = Typography;

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24}}
                style={{ maxWidth: 800 }}
                layout="horizontal"
                className='form__container'
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Title style={{textAlign:'center', marginBlockEnd:'2.2rem'}}>Registro</Title>
                <Form.Item<FieldType>
                    label="First Name"
                    name="firstName"
                    rules={[{ required: true, message: 'Ingresa el campo correcto!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Last Name"
                    name="lastName"
                    rules={[{ required: true, message: 'Ingresa el campo correcto' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="contrasena"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item<FieldType>
                    label="repetir contrasena"
                    name="repeatPassword"
                    labelCol={{ span: 10}}
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>


                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Enviar
                    </Button>
                </Form.Item>
                <p style={{textAlign:'center'}}>Ya tienes una cuenta? <a style={{color:'#01FAF5', textDecoration:'underline'}} href={'/login'}>Inicia sesion</a></p>
            </Form>
        </>
    );
}