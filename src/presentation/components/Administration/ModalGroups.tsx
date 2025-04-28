import { Flex } from "antd"
import './styles/ModalGroups.css';
import {GroupType} from "../../../domain/types/CompanyTypes.ts";
import {useLayoutEffect, useRef} from "react";
type Props = {
    groupsUser:GroupType[],
}

const checkOverFlowingHeight = (el:Element | null)=>{
    if (el === null) return false;
    return el.clientHeight < el.scrollHeight;
}


export const ModalGroups = ({groupsUser}:Props)=>{

    const modalGroups = useRef<HTMLDivElement>(null);
    const groupExist = groupsUser ?? []

    useLayoutEffect(() => {
        if(checkOverFlowingHeight(modalGroups.current)){
           modalGroups.current ? modalGroups.current.style.height  = '84px': 'auto';
        }
    },[])

    return (
        <div className="modal-groups" ref={modalGroups}>
            <p className='modal-groups__text'>Grupos a los que pertenece</p>
            <Flex wrap gap={4}>
                {
                    groupExist.length ?
                    groupsUser.map((group) =>( <p className='groups__tag' key={group.name}>{group.name}</p>))
                        : <p className='modal-groups__text' >No hay grupos</p>
                }

            </Flex>
        </div>
    )
}