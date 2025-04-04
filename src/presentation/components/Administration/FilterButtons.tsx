import {Flex, Spin} from 'antd';
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {Dispatch, useEffect, useRef, useState} from "react";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {upperCaseOneWord} from "../../utilities";
import {useAdministration, valueAdministrationContext} from "../../context/Administration";
import {getGroupsNames} from "../../utilities";


const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);

type Props = {
    name: string;
    setFilter:Dispatch<React.SetStateAction<any>>;
    filters:string[]
}

export const ButtonFilter = ({name,filters,setFilter}:Props) =>{
    const buttonRef = useRef<HTMLButtonElement>(null);

    return (
        <button
            className='button-filter'
            data-filter={name}
            ref={buttonRef}
            onClick={() => {
                if (!buttonRef.current) return;
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
    const {filters,setFilters}:valueAdministrationContext = useAdministration();
    const [isLoading,setIsLoading] = useState(true);

    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()

            .then((data)=>{
                const groups = getGroupsNames(data);
                setCompanyGroups(groups);
                setIsLoading(false);
            }).catch(()=>{
            setCompanyGroups([]);
        })
    }

    useEffect(() => {
        getGroupsFromCompany()
    }, []);

    return (<>
            <div>
                <p>Filtrar por grupos</p>
            </div>
            <Flex justify='flex-start' gap={8} wrap='wrap'>
                {!isLoading ? companyGroups.map((company,index) => (
                    <ButtonFilter
                        name={company.toLowerCase()}
                        key={index}
                        setFilter={setFilters}
                        filters={filters}
                    />
                )): <Spin size='small' tip='Cargando filtros'></Spin>
                }
            </Flex>
            </>
    )
}