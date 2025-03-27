import {ChangeEvent} from "react";
import {Flex} from "antd";
import {CheckBox} from '../common'
import {upperCaseOneWord} from "../../utilities";

type Props ={
    value:string,
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

    return (<label className='checkbox-container' data-value={value}>
        <Flex justify='space-between' align='center'>
            <p className="checkbok__tag">{upperCaseOneWord(value.toLowerCase())}</p>

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'8px'}}>
                <p style={{color:'var(--c_slate_400)'}}>{groupSize} miembros</p>
                <CheckBox
                    handleChange={handleChange}
                    checkedValue={checkedValue}
                    value={value}
                    isDisabled={isDisabled}
                />
            </div>
        </Flex>
    </label>)

}