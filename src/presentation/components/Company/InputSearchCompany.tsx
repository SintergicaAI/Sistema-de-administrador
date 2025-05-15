import { InputSearch } from "../common";
import { useCompanyContext } from "../../context/Company/useCompanyContext";

export const InputSearchCompany = () => {
    const { setFilterValue } = useCompanyContext();

    return (
        <InputSearch
            placeholder="Buscar empresas"
            searchMethod={setFilterValue}
        />
    );
};
