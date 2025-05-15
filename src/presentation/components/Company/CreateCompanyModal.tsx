import { Modal, Form, Input } from 'antd';
import { Company } from '../../context/Company/CompanyContext.tsx';

interface CreateCompanyModalProps {
    open: boolean;
    onCancel: () => void;
    onSubmit: (values: Omit<Company, 'id'>) => void;
    loading?: boolean;
}

export const CreateCompanyModal = ({ open, onCancel, onSubmit, loading }: CreateCompanyModalProps) => {
    const [form] = Form.useForm();

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            onSubmit(values);
            form.resetFields();
        } catch (error) {
            console.error('Error en validación:', error);
        }
    };

    return (
        <Modal
            title="Nueva Empresa"
            open={open}
            onCancel={onCancel}
            onOk={handleSubmit}
            okText="Crear"
            cancelText="Cancelar"
            confirmLoading={loading}
        >
            <Form
                form={form}
                layout="vertical"
                name="createCompanyForm"
            >
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[{ required: true, message: 'Por favor ingrese el nombre' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="rfc"
                    label="RFC"
                    rules={[{ required: true, message: 'Por favor ingrese el RFC' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="address"
                    label="Dirección"
                    rules={[{ required: true, message: 'Por favor ingrese la dirección' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};