import {useParams} from "react-router";
import {Layout} from "antd";

const {Content} = Layout;

export const GroupInfoVIew = ()=>{
    let {nameGroup} = useParams();

    return (<Layout>
        <Content>
            <h1>Bienvenido al grupo:{nameGroup} </h1>
        </Content>
    </Layout>);
}