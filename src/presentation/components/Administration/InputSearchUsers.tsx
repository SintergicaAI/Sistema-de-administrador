import {useAdministration, valueAdministrationContext} from "../../context/Administration";
import {InputSearch} from "../common";

export const InputSearchUsers = () => {
    const {changeSearchText,
    }:valueAdministrationContext = useAdministration();

    return (
        <>
            <InputSearch
                searchMethod={changeSearchText}
                placeholder={"Buscar miembros"}
                styles={{width:'200px'}} />
            </>
    )
}