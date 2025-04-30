import './style/SiderContent.css';
import {InputSearch} from "../common";
import {Flex} from "antd";
import {ChexboxesAsistentes} from "./ChexboxesAsistentes.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

export const SiderContentAsistentes = ()=>{
    const {setFilterValue} = useGroupContext();

    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Asistentes</p>

            <Flex vertical gap={16}>
                <InputSearch placeholder={"buscar"} searchMethod={setFilterValue}/>
                <ChexboxesAsistentes/>
            </Flex>
        </div>
    )
}