import { Layout } from "antd";
import { HeaderPages } from "../../components/common";
import { Content } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";
import { CompanyProvider } from "../../context/Company/CompanyProvider";
import './styles/ContentStyle.css';
import { HeaderCompanyContent } from "../../components/Company/HeaderCompanyContent";

export const Company = () => {
    return (
        <CompanyProvider>
            <Layout style={{ minHeight: '100vh' }}>
                <HeaderPages>
                    <HeaderCompanyContent />
                </HeaderPages>
                <Content>
                    <Outlet />
                </Content>
            </Layout>
        </CompanyProvider>
    );
};