import {Layout,Typography} from "antd";

const {Header}  = Layout;
const {Title} = Typography;
export const HeaderPages = ({text}:{text:string}) =>{
    return (
        <Header style={{borderBottom:'1px solid #CBD5E1'}}>
            <Title>{text}</Title>
        </Header>
    )
}