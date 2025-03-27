import {Flex} from "antd";
import {useContext, useEffect, useState} from "react";
import {DataType} from "./types/TableAdministrationTypes.ts";
import {AdministrationContext} from "../../context/Administration";

type Props = {
    groups:string[],
    record:DataType,
}


export const RenderGroups = ({groups,record}:Props)=>{
    const [sizeGroup, setSizeGroup] = useState(groups.length);
    const [id, setId] = useState<string>(record.key);

    const {selectedRow } = useContext(AdministrationContext);

    useEffect(() => {
        if(selectedRow.key === id){
            setSizeGroup(selectedRow.groups.length);
        }
    }, [selectedRow]);

    return (<Flex align="center" gap={12}>
            <p>{sizeGroup} {sizeGroup >1? 'grupos': 'grupo '}</p>
        </Flex>
    )
}