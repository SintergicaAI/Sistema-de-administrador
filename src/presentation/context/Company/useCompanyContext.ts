import { useContext } from "react";
import { CompanyContext } from "./CompanyContext.tsx";

export const useCompanyContext = () => {
    const currentCompanyContext = useContext(CompanyContext);

    if (!currentCompanyContext) {
        throw new Error(
            "Error al utilizar el contexto de Company"
        );
    }

    return currentCompanyContext;
}
