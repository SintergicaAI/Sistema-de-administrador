import {InputSearch} from "../common";

export const SiderContentConocimiento = ()=>{
    return (
        <div className='sider-content'>
            <p className='sider-paragraph'>Conocimiento</p>

            <InputSearch placeholder={"buscar"} searchMethod={()=>{}}/>
        </div>
    )
}