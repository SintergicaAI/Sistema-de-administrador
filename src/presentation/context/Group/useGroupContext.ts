import {useContext} from "react";
import {GroupContext} from "./GroupContext.tsx";

export const useGroupContext = ()=>{
    const currentGroupContext = useContext(GroupContext);

    if (!currentGroupContext) {
        throw new Error(
            "Error al utilizar el contexto"
        );
    }

    return currentGroupContext;

}