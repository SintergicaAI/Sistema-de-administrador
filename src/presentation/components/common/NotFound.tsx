type Props = {
    message:string
}

export const NotFound = ({message}:Props)=>{
    return (
        <p className={'label'} style={{textAlign:'center'}}>{message} </p>
    )
}