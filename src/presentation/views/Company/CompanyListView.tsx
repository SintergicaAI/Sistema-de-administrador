import { Button, Layout, message, Modal } from "antd";
import { SquarePlus } from "lucide-react";
import { CompaniesList } from "../../components/Company/CompanyList.tsx";
import { useCompanyContext } from "../../context/Company/useCompanyContext.ts";
import { InputSearchCompany } from "../../components/Company/InputSearchCompany.tsx";
import { CreateCompanyModal } from "../../components/Company/CreateCompanyModal.tsx";
import { useState, useEffect } from "react";
import { Company } from "../../context/Company/CompanyContext";
import { CompanyApi } from "../../../infrastructure/api/CompanyApi";

const { Header, Content } = Layout;
const companyApi = new CompanyApi();

export const CompanyListView = () => {
    const {
        totalCompanies,
        companies,
        setCompanies,
        setTotalCompanies //
    } = useCompanyContext();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
        setIsLoading(true);
        try {
            const data = await companyApi.getAllCompanies();
            const companiesData = data as Company[];
            setCompanies(companiesData);
            setTotalCompanies(companiesData.length);
        } catch (error) {
            console.error('Error:', error);
            messageApi.error('Error al cargar las empresas');
        } finally {
            setIsLoading(false);
        }
    };


    const handleCreateCompany = async (companyData: Omit<Company, 'id'>) => {
        setIsLoading(true);
        try {
            const response = await companyApi.addNewCompany(companyData);
            const newCompany = response as Company;
            const updatedCompanies: Company[] = [...companies, newCompany];
            setCompanies(updatedCompanies);
            setTotalCompanies(updatedCompanies.length);
            setIsModalOpen(false);
            messageApi.success('Empresa creada exitosamente');
        } catch (error) {
            console.error('Error:', error);
            messageApi.error('Error al crear la empresa');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCompany = async (companyId: string) => {
        Modal.confirm({
            title: '¿Estás seguro de eliminar esta empresa?',
            content: 'Esta acción no se puede deshacer',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'No, cancelar',
            onOk: async () => {
                try {
                    const success = await companyApi.deleteCompany(companyId);
                    if (success) {
                        const updatedCompanies = companies.filter(company => company.id !== companyId);
                        setCompanies(updatedCompanies);
                        setTotalCompanies(updatedCompanies.length);
                        messageApi.success('Empresa eliminada exitosamente');
                    } else {
                        messageApi.error('No se pudo eliminar la empresa');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    messageApi.error('Error al eliminar la empresa');
                }
            },
        });
    };

    return (
        <Layout className='container-content' style={{display:'flex', flexDirection:'column'}}>
            {contextHolder}
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Button
                    type="primary"
                    icon={<SquarePlus style={{width:20, height:20}}/>}
                    onClick={() => setIsModalOpen(true)}
                >
                    Nueva empresa
                </Button>

                <div style={{display: 'flex',gap:8}}>
                    <p style={{marginBlock:0}}>
                        {totalCompanies} {`${totalCompanies !== 1 ? 'empresas': 'empresa'}`}
                    </p>
                    <div style={{minWidth:250}}>
                        <InputSearchCompany/>
                    </div>
                </div>
            </Header>
            <Content style={{flexGrow:1, marginTop:24}}>
                <CompaniesList onDelete={handleDeleteCompany}/>
            </Content>

            <CreateCompanyModal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onSubmit={handleCreateCompany}
                loading={isLoading}
            />
        </Layout>
    );
};