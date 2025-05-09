import {CheckboxContainer} from "../common";
import {ChangeEvent, useMemo, useState} from "react";
import {BoxModel} from "./BoxModel.tsx";
import {Model} from "./GroupsTypes.ts";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {filterData} from "../../utilities/filteringData.ts";

const models:Model[] = [{
    id:"1",
    colorIcon:'orange',
    title:'Otro',
    value:'otro',
    text:'Un asistente creado para el departamento de marketing',
    filterValue:"otro",
},
    {
        id:"2",
        colorIcon:'',
        title:'Flow',
        value:'flow',
        text:'Un asistente creado para el departamento de marketing',
        filterValue: "flow",
    },
    {
        id:"3",
        colorIcon:'purple',
        title:'Desarrollo',
        value: 'desarrollo',
        text:'Un asistente creado para el departamento de marketing',
        filterValue:"desarrollo"
    },
]

export const ChexboxesAsistentes = ({filterValue}:{filterValue:string})=>{

    const {asistentesSelected, setAsistentesSelected} = useGroupContext();

    const [modelsChecked,setModelsChecked] = useState([...asistentesSelected.map(item => item.value)])
    const [listAsistentes, setListAsistentes] = useState<Model[]>([...models])

    const filteredData = useMemo(()=>{
        return filterData<Model>(filterValue,listAsistentes);
    },[filterValue,listAsistentes]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        if(target.checked){
            const checkedValue = target.value;
            setModelsChecked([...modelsChecked, checkedValue]);

            //Applying find in an inmutable array of Models
            setAsistentesSelected([...asistentesSelected,
                {...(models.find(item => item.value === checkedValue) as Model)}]);
        }else{
            const unCheckedValue = target.value;
            const withoutCheckedValue =
                modelsChecked.filter((item)=>item.toLowerCase() !== unCheckedValue.toLowerCase());
            setModelsChecked([...withoutCheckedValue]);
            setAsistentesSelected([...asistentesSelected.filter(item => item.value.toLowerCase() !== unCheckedValue.toLowerCase() )])
        }
    }

    return (
        <>
            { filteredData.length > 0 ?
                filteredData.map((model, index)=>(
                <CheckboxContainer
                    key={index}
                    checkedValue={modelsChecked}
                    objectValue={{value:model.value, name:''}}
                    handleChange={handleCheckBoxGroup}
                    labelComponent={<BoxModel
                        text={model.text}
                        color={model.colorIcon}
                        title={model.title} />}

                />
            )) : "Sin asistentes" }
        </>
    )
}