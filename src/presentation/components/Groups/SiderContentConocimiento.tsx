import {InputSearch} from "../common";
import {CheckBoxesConocimiento} from "./CheckBoxesConocimiento.tsx";
import {Flex} from "antd";

export const SiderContentConocimiento = ()=>{
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Conocimiento</p>

            < Flex vertical gap={16}>
                <InputSearch placeholder={"buscar"} searchMethod={()=>{}}/>
                <CheckBoxesConocimiento/>
            </Flex>
        </div>
    )
}