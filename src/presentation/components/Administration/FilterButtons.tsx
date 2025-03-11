import {Flex} from 'antd';
import {GetCompanyGroups} from "../../../application/use-cases/GetCompanyGroups.ts";
import {Dispatch, useEffect, useRef, useState} from "react";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {upperCaseOneWord} from "../../utilities";


const companyAPI = new CompanyApi();
const getGroupCompany = new GetCompanyGroups(companyAPI);

type Props = {
    name: string;
    setFilter:Dispatch<React.SetStateAction<any>>;
}

export const ButtonFilter = ({name}:Props) =>{
    const buttonRef = useRef(null);

    return (
        <button
            className='button-filter'
            data-filter={name}
            ref={buttonRef}
            onClick={() => {
                buttonRef.current?.classList.toggle('button-filter--active');
                console.log(buttonRef.current.dataset.filter);
            }}
        >
            {upperCaseOneWord(name)}
        </button>
    )
}

export const FilterButtons = () => {
    const [companyGroups, setCompanyGroups] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);

    const getGroupsFromCompany =  () =>{
        getGroupCompany.execute()
            .then((data)=>{
                setCompanyGroups(data);
            }).catch(()=>{
            setCompanyGroups([]);
        })
    }
    useEffect(() => {
        getGroupsFromCompany()
    }, []);

    useEffect(() => {
        console.log(filters);
    }, [filters]);

    return (<>
            <div>
                <p>Filtar por grupos</p>
            </div>
            <Flex justify='flex-start' gap={8}>
                {companyGroups.length !== 0 ? companyGroups.map((company,index) => (
                    <ButtonFilter
                        name={company}
                        key={index}
                        setFilter={setFilters}
                    />
                )):""}
            </Flex>
            </>
    )

    /*<ConfigProvider theme={
                        {
                            token:{

                            },
                            components:{
                            Button:{
                                    defaultBg:'var(--c_slate_200)',
                                    defaultColor:'var(--c_slate_500)',
                                    borderRadius:8,
                                    defaultHoverBg:'var(--c_slate_200)',
                                    defaultHoverColor:'var(--c_brand-500)',
                                    defaultHoverBorderColor:'var(--c_brand-500)',
                                    defaultActiveBg:'var(--c_brand_100)',
                                    defaultActiveColor:'var(--c_brand-500)'
                                }
                            }
                        }
                    }
                        >
                        <ButtonFilter name={company}/>
                    </ConfigProvider>*/
}