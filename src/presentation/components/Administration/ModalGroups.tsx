import { Flex } from "antd"
import './styles/ModalGroups.css';
import '../common/styles/SideBar.css';
import {GroupType} from "../../../domain/types/CompanyTypes.ts";
type Props = {
    groupsUser:GroupType[],
}

export const ModalGroups = ({groupsUser}:Props)=>{

    const groupExist = groupsUser ?? []
    console.log(groupsUser)
    return (
        <div className="modal-groups">
            <p className='modal-groups__text'>Grupos a los que pertenece</p>
            <Flex wrap gap={4}>
                {
                    groupExist.length ?
                    groupsUser.map((group) =>( <p className='checkbok__tag'>{group.name}</p>))
                        : <p className='modal-groups__text'>No hay grupos</p>
                }
            </Flex>
        </div>
    )
}