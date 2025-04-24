import {InputSearch} from "../common";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

export const InputSearchGroups = () =>{

    const {setFilterValue} = useGroupContext();

    return (<>
        <InputSearch placeholder={"Buscar grupos"} searchMethod={setFilterValue}/>
    </>)
}