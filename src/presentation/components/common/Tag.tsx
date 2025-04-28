import './styles/Tags.css';
type Props = {
    color:string,
    text:string,
}

export const Tag = ({color,text}:Props)=>{
    return (
        <div className='tag' data-color={color}>
            <p className='tag__text'>{text}</p>
        </div>
    )
}