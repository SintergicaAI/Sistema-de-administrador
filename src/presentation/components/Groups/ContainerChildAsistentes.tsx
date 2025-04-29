import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {BoxModel} from "./BoxModel.tsx";
import {useEffect} from "react";

export const ContainerChildAsistentes = () =>{

    const {asistentesSelected, setAsistentesSelected} = useGroupContext()

    useEffect(() => {
        setAsistentesSelected([{id:"1",
            iconUrl:'img.png',
            title:'Otro',
            value:'otro',
            text:'Un asistente creado para el departamento de marketing',
            filterValue:"otro"}])
    }, []);

    return (<>
        {
            asistentesSelected.length == 0 ? <p>No hay modelos asociados, da click en <span className='highlight-text'>Administrar modelos</span>, para cambiar agregar modelos</p>
                : <div className="container-child-asistentes">
                    {asistentesSelected.map((model)=>(<BoxModel title={model.title} key={model.id} text={model.text} />))}
                </div>
        }

        </>)
}