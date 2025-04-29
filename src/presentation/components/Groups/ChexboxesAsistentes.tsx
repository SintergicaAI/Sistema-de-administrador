import {CheckboxContainer} from "../common";
import {ChangeEvent, useEffect, useState} from "react";
import {BoxModel} from "./BoxModel.tsx";
import {Model} from "./GroupsTypes.ts";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {filteringData} from "../../utilities/filteringData.ts";

const models:Model[] = [{
    id:"1",
    iconUrl:'img.png',
    title:'Otro',
    value:'otro',
    text:'Un asistente creado para el departamento de marketing',
    filterValue:"otro",
},
    {
        id:"2",
        iconUrl:'img.png',
        title:'Flow',
        value:'flow',
        text:'Un asistente creado para el departamento de marketing',
        filterValue: "flow",
    },
    {
        id:"3",
        iconUrl:'img.png',
        title:'Desarrollo',
        value: 'desarrollo',
        text:'Un asistente creado para el departamento de marketing',
        filterValue:"desarrollo"
    },
]

export const ChexboxesAsistentes = ()=>{

    const {filterValue,asistentesSelected, setAsistentesSelected} = useGroupContext();

    const [modelsChecked,setModelsChecked] = useState([...asistentesSelected.map(item => item.value)])
    const [listAsistentes, setListAsistentes] = useState<Model[]>([...models])
    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        if(target.checked){
            const checkedValue = target.value;
            setModelsChecked([...modelsChecked, checkedValue]);
        }else{
            const unCheckedValue = target.value;
            const withoutCheckedValue = modelsChecked.filter((item)=>item.toLowerCase() !== unCheckedValue.toLowerCase());
            setModelsChecked([...withoutCheckedValue]);
        }
    }

    useEffect(() => {
        const filter = filteringData<Model>(filterValue,listAsistentes,models);
        setListAsistentes(filter);
    }, [filterValue]);

    return (
        <>
            {listAsistentes.map((model, index)=>(
                <CheckboxContainer
                    key={index}
                    checkedValue={modelsChecked}
                    objectValue={{value:model.value, name:''}}
                    handleChange={handleCheckBoxGroup}
                    labelComponent={<BoxModel text={model.text} title={model.title} />}

                />
            ))}
        </>
    )
}