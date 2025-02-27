import {Input} from 'antd';
import {AdministrationContext, valueAdministrationContext} from "../../context/Administration";
import {useContext} from "react";
import { Search } from 'lucide-react';


export const InputSearch = () => {
    const {changeSearchText}:valueAdministrationContext = useContext(AdministrationContext);

    return (
        <>
            {/*<Input.Search
                placeholder={"Buscar miembro"}
                allowClear={true}
                style={{width:'200px'}}
                onSearch={(value) => {
                    changeSearchText(value);
                }}
            />*/}
            <Input placeholder={'Buscar miembro'}
                   suffix={<Search width={20} height={20} strokeWidth={1}/>}
                   onPressEnter={(e) =>{
                       e.preventDefault();
                       // @ts-ignore
                       if(e.target.value.length > 0){
                           // @ts-ignore
                           changeSearchText(e.target.value);
                       }
                   }
                }
                   style={{ width: '200px' }}
            />
            </>
    )
}