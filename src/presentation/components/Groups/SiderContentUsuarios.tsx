import {InputSearch} from "../common";
import {Flex} from "antd";
import {CheckBoxesMiembros} from "./CheckBoxesMiembros.tsx";

export const SiderContentUsuarios = () => {
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Usuarios</p>

            <Flex gap={16} vertical>
                <InputSearch placeholder='buscar' searchMethod={()=>{}}></InputSearch>
                <CheckBoxesMiembros/>
            </Flex>
        </div>
    )
}