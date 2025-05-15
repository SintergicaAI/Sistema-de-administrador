import { createContext } from "react";

export interface Company {
    id: string;
    rfc: string;
    name: string;
    address: string;
}

interface CompanyContextType {
    companies: Company[];
    setCompanies: (companies: Company[]) => void;
    selectedCompany: Company | null;
    setSelectedCompany: (company: Company | null) => void;
    totalCompanies: number;
    setTotalCompanies: (total: number) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    filterValue: string;
    setFilterValue: (value: string) => void;
}

export const CompanyContext = createContext<CompanyContextType>({} as CompanyContextType);

