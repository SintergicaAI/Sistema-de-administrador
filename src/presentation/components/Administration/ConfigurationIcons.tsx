import {AdministrationContext} from "../../context/Administration/AdministrationContext.tsx";
import {useContext} from "react";
import {Flex} from "antd";
import {InputSearchUsers} from "./InputSearchUsers.tsx";


export const ConfigurationIcons = () =>{

    const {totalItemsTable} = useContext(AdministrationContext);

    return (<Flex gap={16} align={"center"} justify={'center'} style={{position:"relative"}}>
                <p>{totalItemsTable} asistentes</p>
                <InputSearchUsers/>
            </Flex>)
}