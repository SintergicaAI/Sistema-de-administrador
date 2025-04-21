import {CSSProperties} from "react";

const style:CSSProperties = {
    fontWeight:'700',
    color:'var(--c_brand-500)',

}

export const NotFoundGroups = () => {
    return (
        <div style={{textAlign:'center',display:'grid', placeContent:'center'}}>
            <div style={{width:120, height:120, marginInline:'auto'}}>
                <img
                style={{
                    maxWidth:'100%',
                    height:'auto',
                    display:'block'
                }}
                    src="/src/assets/NotFound.png"
                     alt="Elemento no encontrado"/>
            </div>
            <p style={{...style, fontSize:20}}>Aun no tienes grupos creados</p>
            <p>Crea un <span style={{...style, cursor:'pointer'}}> Nuevo grupo </span> para empezar a asignarlo a usuarios</p>
        </div>
    )
}