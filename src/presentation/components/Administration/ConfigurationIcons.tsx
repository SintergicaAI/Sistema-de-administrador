import {Flex} from "antd";
import {InputSearchUsers} from "./InputSearchUsers.tsx";
import {useAdministration} from "../../context/Administration";


export const ConfigurationIcons = () =>{

    const {totalItemsTable} = useAdministration();

    return (<Flex gap={16} align={"center"} justify={'center'} style={{position:"relative"}}>
                <p>{totalItemsTable} asistentes</p>
                <InputSearchUsers/>
            </Flex>)
}