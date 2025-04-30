import {InputSearch} from "../common";
import {Flex} from "antd";
import {CheckBoxesMiembros} from "./CheckBoxesMiembros.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

export const SiderContentUsuarios = () => {
    const {setFilterValue} = useGroupContext();
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Usuarios</p>

            <Flex gap={16} vertical>
                <InputSearch placeholder='buscar' searchMethod={setFilterValue}></InputSearch>
                <CheckBoxesMiembros/>
            </Flex>
        </div>
    )
}