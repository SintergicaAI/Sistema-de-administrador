import {SideBarGeneral} from "../common/SideBarGeneral.tsx";
import {Avatar} from "../common/Avatar.tsx";
import type {DataType} from './types/TableAdministrationTypes.ts'
import {SiderContent} from  './SiderContent.tsx';
import {useContext} from "react";
import {AdministrationContext} from "../../context/Administration";
import {Flex} from "antd";
import {DeleterUserButton} from "./ModalDeleteUser/DeleterUserButton.tsx";


const SiderHeader = ()=>{
    const {selectedRow} = useContext(AdministrationContext);
    const {fullName} = selectedRow as DataType;
    return (
        <div style={{flexGrow: 1}}>
            <Flex align={'center'} gap={5}>
                <Avatar name={`${fullName}`} type={'active'}/>
                <p style={{fontWeight:'700',fontSize:'var(--subtitle-size:16px)'}}>{`${fullName}`}</p>
                <DeleterUserButton/>
            </Flex>
        </div>
    )
}


export const SidebarTableAdministration = () => {
    const {changeHasSelected} = useContext(AdministrationContext);
    return (
        <SideBarGeneral
            childrenHeader={<SiderHeader/>}
            contentChildren={<SiderContent/>}
            hasSelected={changeHasSelected}
        />
    )
}
