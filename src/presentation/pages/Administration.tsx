import {Layout} from "antd";
import {HeaderPages} from "../components/Home/HeaderPages.tsx";

const {Content} = Layout

export const Administration = ({texto}:{texto:string}) =>{
    return (
        <>
            <HeaderPages text={texto}/>
            <Content>

            </Content>
        </>
    );
}