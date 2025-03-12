import {AdministrationContext, valueAdministrationContext} from "../../context/Administration";
import {useContext, useEffect} from "react";
import {InputSearch} from "../common";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {FindUserInCompany} from "../../../application/use-cases/FindUserInCompany.ts";
import {UserSearchParams} from "../../../domain/repositories/CompanyRepository.ts";

const companyApi = new CompanyApi();
const findUserInCompany = new FindUserInCompany(companyApi);



export const InputSearchUsers = () => {
    const {changeSearchText,
        searchText,
        changeDataTabla,
        setLoadingTable
    }:valueAdministrationContext = useContext(AdministrationContext);

    const findUserByName = () =>{
        setLoadingTable(true);
        const searchParams: UserSearchParams = {
            query:searchText,
            size:5
        }
        findUserInCompany.execute(searchParams).then((data)=>{
            const {users} = data;
            changeDataTabla(users);
            setLoadingTable(false);
        }).catch((err)=>{
            console.error(err);
        })
    }

    useEffect(() => {
        findUserByName();
    }, [searchText]);

    return (
        <>
            <InputSearch
                searchMethod={changeSearchText}
                placeholder={"Buscar miembros"}
                styles={{width:'200px'}} />
            </>
    )
}