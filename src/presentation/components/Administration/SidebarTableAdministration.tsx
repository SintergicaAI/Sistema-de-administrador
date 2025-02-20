import {SideBarConfiguration} from "../common/SideBarConfiguration.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {DataType} from './types/TableAdministrationTypes.ts'
import {SiderContent} from  './SiderContent.tsx';
import {useContext} from "react";
import {AdministrationContext} from "../../context/Administration/AdministrationContext.tsx";
import {Flex} from "antd";



export const SidebarTableAdministration = () => {
    const {selectedRow,changeHasSelected} = useContext(AdministrationContext);
    const {name} = selectedRow as DataType;
    /*style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}*/
    return (
        <SideBarConfiguration
            childrenHeader={(
                <Flex align={'center'} gap={5}>
                    <Avatar name={name}/>
                    <p style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}>{name}</p>
                </Flex>
            )}
            contentChildren={<SiderContent/>}
            hasSelected={changeHasSelected}
        />
    )
}
