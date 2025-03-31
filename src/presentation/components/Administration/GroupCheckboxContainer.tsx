import {ChangeEvent} from "react";
import {Flex} from "antd";
import {CheckBox} from '../common'
import {upperCaseOneWord} from "../../utilities";
import {GroupType} from "../../../domain/types/CompanyTypes.ts";

type Props ={
    value:GroupType, //todo:Modificar tipo de valor string -> groupItem
    checkedValue:string[],
    handleChange:(event:ChangeEvent<HTMLInputElement>) => void,
    groupSize:number |  undefined,
    isDisabled?:boolean,
}

export const GroupCheckboxContainer = ({
                                           value,
                                           checkedValue,
                                           groupSize,
                                           handleChange,
                                           isDisabled,
                                       }:Props) =>{

    return (<label className='checkbox-container' data-value={value.group_id}>
        <Flex justify='space-between' align='center'>
            <p className="checkbok__tag">{upperCaseOneWord(value.name)}</p>

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'8px'}}>
                <p style={{color:'var(--c_slate_400)'}}>{groupSize} miembros</p>
                <CheckBox
                    handleChange={handleChange}
                    checkedValue={checkedValue}
                    value={value.group_id}
                    isDisabled={isDisabled}
                />
            </div>
        </Flex>
    </label>)

}