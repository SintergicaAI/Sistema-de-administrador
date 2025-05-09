import {useAdministration, valueAdministrationContext} from "../../context/Administration";
import {InputSearch} from "../common";

export const InputSearchUsers = () => {
    const {changeSearchText, searchText
    }:valueAdministrationContext = useAdministration();

    return (
        <>
            <InputSearch
                queryValue={searchText}
                queryMethod={changeSearchText}
                placeholder={"Buscar miembros"}
                styles={{width:'200px'}} />
            </>
    )
}