import {Typography} from "antd";
import './style/BoxModel.css'
const {Title} = Typography;

type Props = {
    title: string;
    text:string;
}

export const BoxModel = ({title,text}:Props) =>{
    return (<div className='model'>
            <div className='model__header'>
                <img src='/src/assets/brand.svg' width={35} height={35} alt={title}/>
                <Title style={{fontSize:20, marginBlock:0}} level={4}>{title}</Title>
            </div>
        <div className='model__body'>
            <p>{text}</p>
        </div>
        </div>)
}