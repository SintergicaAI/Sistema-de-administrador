import './style/SiderContent.css';
import {InputSearch} from "../common";
import {Flex} from "antd";
import {ChexboxesAsistentes} from "./ChexboxesAsistentes.tsx";
import {useState} from "react";

export const SiderContentAsistentes = ()=>{
    const [filterValue,setFilterValue] = useState("");

    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Asistentes</p>

            <Flex vertical gap={16}>
                <InputSearch placeholder={"buscar"} searchMethod={setFilterValue}/>
                <ChexboxesAsistentes filterValue={filterValue}/>
            </Flex>
        </div>
    )
}