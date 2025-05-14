import {IconHelper} from "../common/IconHelper.tsx";
import {Flex, Typography} from "antd";

const {Title} = Typography;
export const HeaderPageContent = ({texto}:{texto:string})=>{
    return (<Flex gap={12} align={"center"}>
        <Title style={{fontWeight:'bold'}}>{texto}</Title>
        <IconHelper message={"Aquí se lleva un control de los miembros que conforman tu empresa"}/>
    </Flex>)
}