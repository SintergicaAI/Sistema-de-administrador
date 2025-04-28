import './style/SiderContent.css';
import {InputSearch} from "../common";

export const SiderContentAsistentes = ()=>{
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Asistentes</p>

            <InputSearch placeholder={"bsucar"} searchMethod={()=>{}}/>
        </div>
    )
}