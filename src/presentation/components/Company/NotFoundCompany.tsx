import { CSSProperties } from "react";

const style: CSSProperties = {
    fontWeight: '700',
    color: 'var(--c_brand-500)',
}

export const NotFoundCompany = () => {
    return (
        <div style={{textAlign: 'center', display: 'grid', placeContent: 'center'}}>
            <div style={{width: 120, height: 120, marginInline: 'auto'}}>
                <img
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                        display: 'block'
                    }}
                    src="/src/assets/NotFound.png"
                    alt="Compañía no encontrada"
                />
            </div>
            <p style={{...style, fontSize: 20}}>Aun no tienes compañías registradas</p>
            <p>Registra una <span style={{...style, cursor: 'pointer'}}> nueva compañía </span>
                para empezar a gestionar sus datos</p>
        </div>
    )
}