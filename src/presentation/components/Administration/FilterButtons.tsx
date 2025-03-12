import {Flex} from 'antd';
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {Dispatch, useContext, useEffect, useRef, useState} from "react";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {upperCaseOneWord} from "../../utilities";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {UserSearchParams} from "../../../domain/repositories/CompanyRepository.ts";
import {AdministrationContext} from "../../context/Administration";


const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);
const findUsersInCompany = new GetAllUserCompanyData(companyAPI);

type Props = {
    name: string;
    setFilter:Dispatch<React.SetStateAction<any>>;
    filters:string[]
}

export const ButtonFilter = ({name,filters,setFilter}:Props) =>{
    const buttonRef = useRef(null!);

    return (
        <button
            className='button-filter'
            data-filter={name}
            ref={buttonRef}
            onClick={() => {
                buttonRef.current.classList.toggle('button-filter--active');
                const typeFilter = buttonRef.current.dataset.filter;

                if( buttonRef.current?.classList.contains('button-filter--active') ){
                    setFilter([...filters,typeFilter]);
                }else{
                    setFilter([...filters.filter(item => item.toLowerCase() !== typeFilter) ]);
                }
            }}
        >
            {upperCaseOneWord(name)}
        </button>
    )
}

export const FilterButtons = () => {
    const [companyGroups, setCompanyGroups] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const {changeDataTabla} = useContext(AdministrationContext)

    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
                setCompanyGroups(data);
            }).catch(()=>{
            setCompanyGroups([]);
        })
    }

    const getUsersInCompanyByGroup = ()=>{
        const searchParams: UserSearchParams = {
            page:0,
            size:5,
            query:"",
            groups:filters
        }
        findUsersInCompany.execute(searchParams).then((data)=>{
            const {users} = data;
            console.log(users);
            //changeDataTabla(users);
        })
    }

    useEffect(() => {
        getGroupsFromCompany()
    }, []);

    useEffect(() => {
        console.log(filters);
        getUsersInCompanyByGroup();
    }, [filters]);

    return (<>
            <div>
                <p>Filtrar por grupos</p>
            </div>
            <Flex justify='flex-start' gap={8}>
                {companyGroups.length !== 0 ? companyGroups.map((company,index) => (
                    <ButtonFilter
                        name={company}
                        key={index}
                        setFilter={setFilters}
                        filters={filters}
                    />
                )):""}
            </Flex>
            </>
    )
}