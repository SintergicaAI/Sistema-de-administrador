import {Layout,Typography} from "antd";

const {Header}  = Layout;
const {Title} = Typography;
export const HeaderPages = ({text}:{text:string}) =>{
    return (
        <Header style={{borderBottom:'1px solid var(--c_slate_300)',marginBottom:'12px'}}>
            <Title style={{fontWeight:'bold'}}>{text}</Title>
        </Header>
    )
}