import {Layout,Typography} from "antd";

const {Header}  = Layout;
const {Title} = Typography;
export const HeaderPages = ({text}:{text:string}) =>{
    return (
        <Header
            style={
            {borderBottom:'1px solid var(--c_slate_300)',
                paddingInline:12,
                marginBottom:'0',
                backgroundColor:"var(--c_slate_100)"}}>
            <Title style={{fontWeight:'bold'}}>{text}</Title>
        </Header>
    )
}