import {InputSearch} from "../common";

export const SiderContentUsuarios = () => {
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Usuarios</p>

            <InputSearch placeholder='buscar' searchMethod={()=>{}}></InputSearch>
        </div>
    )
}