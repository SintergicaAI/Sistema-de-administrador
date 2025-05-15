import { Card, List } from "antd";
import {
    Building2,
    Trash2
} from "lucide-react";
import { Company } from "../../context/Company/CompanyContext";
import { useCompanyContext } from "../../context/Company/useCompanyContext.ts";
import { NotFoundCompany } from "./NotFoundCompany";

interface CompaniesListProps {
    onDelete?: (companyId: string) => void; // Hacemos la prop opcional
}

export const CompaniesList = ({ onDelete }: CompaniesListProps) => {
    const { companies: filteredCompanies, isLoading: loading } = useCompanyContext();

    if (!loading && (!filteredCompanies || filteredCompanies.length === 0)) {
        return <NotFoundCompany />;
    }

    return (
        <List<Company>
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 2,
                lg: 3,
                xl: 4,
                xxl: 4,
            }}
            dataSource={filteredCompanies}
            loading={loading}
            renderItem={(company: Company) => (
                <List.Item key={company.id}>
                    <Card
                        hoverable
                        style={{height: '100%'}}
                        actions={[
                            onDelete && (
                                <div key="delete"
                                     onClick={(e) => {
                                         e.preventDefault();
                                         onDelete(company.id!);
                                     }}
                                     style={{
                                         display: 'flex',
                                         alignItems: 'center',
                                         justifyContent: 'center',
                                         gap: 8,
                                         color: '#ff4d4f',
                                         cursor: 'pointer'
                                     }}>
                                    <Trash2 size={16}/>
                                    <span>Eliminar</span>
                                </div>
                            )
                        ].filter(Boolean)}
                    >
                    <Card.Meta
                            avatar={<Building2 size={24}/>}
                            title={company.name}
                            description={
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 4
                                }}>
                                    <div>
                                        <strong>RFC: </strong>
                                        {company.rfc}
                                    </div>
                                    <div>
                                        <strong>Dirección: </strong>
                                        {company.address}
                                    </div>
                                </div>
                            }
                        />
                    </Card>
                </List.Item>
            )}
        />
    );
};