import {AdministrationContext} from "../../context/Administration/AdministrationContext.tsx";
import {useContext} from "react";
import {Flex} from "antd";
import { SlidersHorizontal } from 'lucide-react';
import {SearchDropDownMenu} from "./SearchDropDownMenu.tsx";


export const ConfigurationIcons = () =>{

    const {dataTable} = useContext(AdministrationContext);

    return (<Flex gap={16} align={"center"}>
                <p>{dataTable.length} miembros</p>
                 <SearchDropDownMenu/>
                <SlidersHorizontal/>
            </Flex>)
}