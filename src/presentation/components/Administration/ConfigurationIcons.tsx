import {AdministrationContext} from "../../context/Administration/AdministrationContext.tsx";
import {useContext} from "react";
import {Flex} from "antd";
//import {SearchDropDownMenu} from "./SearchDropDownMenu.tsx";
import {InputSearch} from "./InputSearch.tsx";


export const ConfigurationIcons = () =>{

    const {totalItemsTable} = useContext(AdministrationContext);

    return (<Flex gap={16} align={"center"} justify={'center'} style={{position:"relative"}}>
                <p>{totalItemsTable} asistentes</p>
                <InputSearch/>
            </Flex>)
}