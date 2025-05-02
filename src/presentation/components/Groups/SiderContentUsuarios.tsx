import {InputSearch} from "../common";
import {Flex} from "antd";
import {CheckBoxesMiembros} from "./CheckBoxesMiembros.tsx";
import {useState} from "react";

export const SiderContentUsuarios = () => {
    const [filterValue,setFilterValue] = useState("");
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Usuarios</p>

            <Flex gap={16} vertical>
                <InputSearch placeholder='buscar' searchMethod={setFilterValue}></InputSearch>
                <CheckBoxesMiembros filterValue={filterValue}/>
            </Flex>
        </div>
    )
}