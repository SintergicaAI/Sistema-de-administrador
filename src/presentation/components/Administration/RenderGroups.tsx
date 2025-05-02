import {Flex} from "antd";
import {useEffect, useState} from "react";
import {DataType} from "./types/TableAdministrationTypes.ts";
import {useAdministration} from "../../context/Administration";
import {ModalGroups} from "./ModalGroups.tsx";
import './styles/ModalGroups.css';
import {GroupBasicInfo} from "../../../domain/types/CompanyTypes.ts";

type Props = {
    groups:GroupBasicInfo[],
    record:DataType,
}



export const RenderGroups = ({groups,record}:Props)=>{
    const [sizeGroup, setSizeGroup] = useState(groups.length);
    const [id] = useState<string>(record.key);
    const [groupUser] = useState<GroupBasicInfo[]>(groups);
    const {selectedRow } = useAdministration();

    //Update when is a change on selectedRow and also is the same as id.
    useEffect(() => {
        if(selectedRow.key === id){
            setSizeGroup(selectedRow.groups.length);
        }
    }, [selectedRow]);

    return (
        <div className='modal-container'>
            <Flex align="center"
                  gap={12}
                  datatype={id}>
                <p >{sizeGroup} {sizeGroup >1? 'grupos': 'grupo '}</p>
            </Flex>
            <ModalGroups groupsUser={groupUser}/>
        </div>
    )
}