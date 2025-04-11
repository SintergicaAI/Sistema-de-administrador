import {Flex, Dropdown, MenuProps} from "antd";
import {useEffect, useMemo, useRef, useState} from "react";
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

    /*const groupItems = groups.length ?
        groups.map((item:string,index) => {
            return {
                key: index,
                label:(
                    <p>{item}</p>
                )
            }
        }) : [];*/

    const items:MenuProps['items'] = [
        {
            key:1,
            type:'group',
            label:'Grupos a los que pertenece',
            children:[
                {
                    key: '1-1',
                    label: 'Ventas',
                },
                {
                    key: '1-2',
                    label: 'Compras',
                },
            ]

        }
    ]
    useEffect(() => {
        if(selectedRow.key === id){
            setSizeGroup(selectedRow.groups.length);
        }
    }, [selectedRow]);

    return (
        <Dropdown menu={{items}} >
            <Flex align="center"
                  gap={12}
                  datatype={id}>
                <p >{sizeGroup} {sizeGroup >1? 'grupos': 'grupo '}</p>
            </Flex>
        </Dropdown>
    )
}