import {InputSearch} from "../common";
import {CheckBoxesConocimiento} from "./CheckBoxesConocimiento.tsx";
import {Flex} from "antd";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

export const SiderContentConocimiento = ()=>{

    const { setFilterValue } = useGroupContext();

    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Conocimiento</p>

            < Flex vertical gap={16}>
                <InputSearch placeholder={"buscar"} searchMethod={setFilterValue}/>
                <CheckBoxesConocimiento/>
            </Flex>
        </div>
    )
}