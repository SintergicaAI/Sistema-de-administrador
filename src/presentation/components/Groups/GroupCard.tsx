import './style/GroupCard.css';
import type {CardData} from "./GroupsTypes.ts";
import {Tooltip} from "antd";

export const GroupCard = ({nameGroup,userCreatorName,size,members}:CardData) =>{
    return (<div className='group-card'>
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
    </div>)
}