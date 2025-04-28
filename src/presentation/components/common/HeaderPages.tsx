import {Layout} from "antd";

const {Header}  = Layout;

type Props = {
    children:JSX.Element
}

export const HeaderPages = ({children}:Props) =>{


    return (
        <Header
            style={
            {borderBottom:'1px solid var(--c_slate_300)',
                paddingInline:12,
                marginBottom:'0',
                backgroundColor:"var(--c_slate_100)"}}>
            {children}
        </Header>
    )
}