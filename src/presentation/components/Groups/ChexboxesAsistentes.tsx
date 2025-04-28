import {CheckboxContainer} from "../common";
import {ChangeEvent} from "react";
import {BoxModel} from "./BoxModel.tsx";

const models = [{
    img:'img.png',
    title:'Otro',
    value:'otro',
    text:'Un asistente creado para el departamento de marketing'
},
    {
        img:'img.png',
        title:'Flow',
        value:'flow',
        text:'Un asistente creado para el departamento de marketing'
    },
    {
        img:'img.png',
        title:'Desarrollo',
        value: 'desarrollo',
        text:'Un asistente creado para el departamento de marketing'
    },
]

export const ChexboxesAsistentes = ()=>{

    const valuesCheked = ['desarrollo', 'flow'];
    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{

    }

    return (
        <>
            {models.map((model, index)=>(
                <CheckboxContainer
                    key={index}
                    checkedValue={valuesCheked}
                    objectValue={{value:model.value, name:''}}
                    handleChange={handleCheckBoxGroup}
                    labelComponent={<BoxModel text={model.text} title={model.title} />}

                />
            ))}
        </>
    )
}