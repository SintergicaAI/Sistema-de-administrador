import {SideBarConfiguration} from "../common/SideBarConfiguration.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {DataType} from './types/TableAdministrationTypes.ts'
import {SiderContent} from  './SiderContent.tsx';
import {useContext} from "react";
import {AdministrationContext} from "../../context/Administration";
import {Flex} from "antd";
import {DeleterUserButton} from "./DeleterUserButton.tsx";


const SiderHeader = ()=>{
    const {selectedRow} = useContext(AdministrationContext);
    const {name,lastName} = selectedRow as DataType;
    return (
        <div style={{flexGrow: 1}}>
            <Flex align={'center'} gap={5}>
                <Avatar name={`${name} ${lastName}`}/>
                <p style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}>{`${name} ${lastName}`}</p>
            </Flex>
            <DeleterUserButton/>
        </div>
    )
}


export const SidebarTableAdministration = () => {
    const {changeHasSelected} = useContext(AdministrationContext);
    return (
        <SideBarConfiguration
            childrenHeader={<SiderHeader/>}
            contentChildren={<SiderContent/>}
            hasSelected={changeHasSelected}
        />
    )
}
