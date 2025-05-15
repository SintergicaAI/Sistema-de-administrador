import { ReactNode, useState } from "react";
import { CompanyContext } from "./CompanyContext";

interface Company {
    id: string;
    rfc: string;
    name: string;
    address: string;
}

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [totalCompanies, setTotalCompanies] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [filterValue, setFilterValue] = useState("");

    return (
        <CompanyContext.Provider value={{
            companies,
            setCompanies,
            selectedCompany,
            setSelectedCompany,
            totalCompanies,
            setTotalCompanies,
            isLoading,
            setIsLoading,
            filterValue,
            setFilterValue
        }}>
            {children}
        </CompanyContext.Provider>
    );
};
