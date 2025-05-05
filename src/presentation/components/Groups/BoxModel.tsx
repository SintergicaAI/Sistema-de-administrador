import {Typography} from "antd";
import './style/BoxModel.css'
import {IconModel} from "../common/IconModel.tsx";
const {Title} = Typography;

type Props = {
    title: string;
    text:string;
    color?:string;
}

export const BoxModel = ({title,text,color}:Props) =>{
    return (<div className='model'>
            <div className='model__header'>
                <IconModel color={color}/>
                <Title style={{fontSize:20, marginBlock:0}} level={4}>{title}</Title>
            </div>
        <div className='model__body'>
            <p>{text}</p>
        </div>
        </div>)
}