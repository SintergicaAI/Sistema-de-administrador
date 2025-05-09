import {InputSearch} from "../common";
import {CheckBoxesConocimiento} from "./CheckBoxesConocimiento.tsx";
import {Flex} from "antd";
import {useState} from "react";

export const SiderContentConocimiento = ()=>{

    const [filterValue,setFilterValue] = useState("");

    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Conocimiento</p>

            < Flex vertical gap={16}>
                <InputSearch queryValue={filterValue} placeholder={"buscar"} queryMethod={setFilterValue}/>
                <CheckBoxesConocimiento filterValue={filterValue}/>
            </Flex>
        </div>
    )
}