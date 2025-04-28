import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {Tag} from "../common/Tag.tsx";
import {useEffect} from "react";


export const ContainerChildConocimiento = ()=>{

    const {conocimientoTagsSelected,setConocimientoTagsSelected} = useGroupContext();

    //Get Tags Knowledge from de groupAPI
    useEffect(() => {
        setConocimientoTagsSelected([{color:'blue',text:'Ventas',value:'ventas'}])
    }, []);

    return (<>
        {
            conocimientoTagsSelected.length == 0 ? <p>Sin bases de conocimiento asociadas, da click en <span className='highlight-text'>Añadir  bases de conocimiento</span> , vincularlas</p>
                : conocimientoTagsSelected.map((tag)=>(<Tag key={tag.text} color={tag.color} text={tag.text}/>))
        }
        </>);
}