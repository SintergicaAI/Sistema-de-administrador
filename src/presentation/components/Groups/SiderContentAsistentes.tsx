import './style/SiderContent.css';
import {InputSearch} from "../common";
import {Flex} from "antd";
import {ChexboxesAsistentes} from "./ChexboxesAsistentes.tsx";

export const SiderContentAsistentes = ()=>{
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Asistentes</p>

            <Flex vertical gap={16}>
                <InputSearch placeholder={"buscar"} searchMethod={()=>{}}/>
                <ChexboxesAsistentes/>
            </Flex>
        </div>
    )
}