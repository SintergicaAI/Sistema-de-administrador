import {useContext} from "react";
import {AdministrationContext} from "./AdministrationContext.tsx";

export const useAdministration = ()=>{
    const currentAdministrationContext = useContext(AdministrationContext);

    if (!currentAdministrationContext) {
        throw new Error(
            "Error al utilizar el contexto"
        );
    }

    return currentAdministrationContext;

}