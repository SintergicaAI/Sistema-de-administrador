import {Flex} from 'antd';
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {Dispatch, useContext, useEffect, useRef, useState} from "react";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {upperCaseOneWord} from "../../utilities";
import {AdministrationContext, valueAdministrationContext} from "../../context/Administration";
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
    const {filters,setFilters}:valueAdministrationContext = useContext(AdministrationContext);

    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{

                const groups = getGroupsNames(data);
                setCompanyGroups(groups);
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
                {companyGroups.length !== 0 ? companyGroups.map((company,index) => (
                    <ButtonFilter
                        name={company.toLowerCase()}
                        key={index}
                        setFilter={setFilters}
                        filters={filters}
                    />
                )):""}
            </Flex>
            </>
    )
}