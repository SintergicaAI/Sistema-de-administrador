import {useAdministration} from "../../context/Administration";
import type {DataType} from "./types/TableAdministrationTypes.ts";
import {Flex} from "antd";
import {Avatar} from "../common";
import {DeleterUserButton} from "./ModalDeleteUser/DeleterUserButton.tsx";

export const SiderBarTableHeader = ()=>{
    const {selectedRow} = useAdministration();
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