import {AdministrationContext, valueAdministrationContext} from "../../context/Administration";
import {useContext} from "react";
import {InputSearch} from "../common/InputSearch.tsx";


export const InputSearchUsers = () => {
    const {changeSearchText}:valueAdministrationContext = useContext(AdministrationContext);

    return (
        <>
            <InputSearch
                searchMethod={changeSearchText}
                placeholder={"Buscar miembros"}
                styles={{width:'200px'}} />
            </>
    )
}