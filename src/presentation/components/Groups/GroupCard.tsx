import './style/GroupCard.css';
import type {CardData} from "./GroupsTypes.ts";
import {Tooltip} from "antd";
import {Link} from "react-router";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

export const GroupCard = ({
                              nameGroup,
                              userCreatorName,
                              size,
                                groupId,
                              members}:CardData) =>{

    const {setActualGroupName} = useGroupContext();

    return ( <Link to={`/groups/${groupId}`} onClick={()=>setActualGroupName(nameGroup) }>
        <div className='group-card' data-id={groupId}>
            <div className='group-card__general' >
                <Tooltip title={nameGroup}>
                    <p className='groups__tag f-size-16'>{nameGroup}</p>
                </Tooltip>
                <p className='group-card__owner'>Creado por <span className='highlight-text'>{userCreatorName}</span></p>
            </div>
            <div className='group-card__info'>
                <p className='group-card__members'>{members} miembros</p>
                <p className='group-card__size'>{size}</p>
            </div>
        </div>
    </Link>
    )
}