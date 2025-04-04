import {Flex} from "antd";
import {useEffect, useState} from "react";
import {DataType} from "./types/TableAdministrationTypes.ts";
import {useAdministration} from "../../context/Administration";

type Props = {
    groups:string[],
    record:DataType,
}


export const RenderGroups = ({groups,record}:Props)=>{
    const [sizeGroup, setSizeGroup] = useState(groups.length);
    const [id] = useState<string>(record.key);

    const {selectedRow } = useAdministration();

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