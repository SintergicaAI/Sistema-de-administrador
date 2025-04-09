const styleImage = {
    width: '100%',
    minWidth: '60px',
    minHeight: '100%',
    backgroundColor:"var(--c_brand-500)",
    display:"grid",
    placeContent:"center",
    borderRadius:"16px",
}

export const ContainerImages = () => {
    return(
        <div style={styleImage}>
            <img src="/src/assets/Union.svg" alt="Logo de la empresa Sintergica" width={350} height={350}/>
        </div>
    )
}