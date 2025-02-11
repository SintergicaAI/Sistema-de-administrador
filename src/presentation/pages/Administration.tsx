import {Button, Flex, Layout} from "antd";
import {HeaderPages} from "../components/Home/HeaderPages.tsx";
import { UserRoundPlus } from 'lucide-react';
const {Content} = Layout

const styleIcon:React.CSSProperties = {
    width: '20px',
    height: '20px',

}

export const Administration = ({texto}:{texto:string}) =>{
    return (
        <>
            <HeaderPages text={texto}/>
            <Content>
                <Flex justify='flex-start' style={{marginInline:24}} >
                    <Button type="primary" icon={<UserRoundPlus style={styleIcon}/>}> Nuevo usuario</Button>
                </Flex>
            </Content>
        </>
    );
}