import {ChangeEvent} from "react";
import {Flex} from "antd";
import {CheckBox} from './index.ts'

type valueType = {
    value:string;
    name:string;
}

type Props ={
    labelComponent:JSX.Element,
    objectValue:valueType,
    checkedValue:string[],
    handleChange:(event:ChangeEvent<HTMLInputElement>) => void,
    extraInfo?:string,
    isDisabled?:boolean,
}

export const CheckboxContainer = ({
                                           labelComponent,
                                      objectValue,
                                           checkedValue,
                                           extraInfo,
                                           handleChange,
                                           isDisabled,
                                       }:Props) =>{

    return (<label className='checkbox-container' data-value={objectValue.value}>
        <Flex justify='space-between' align='center'>
            {
                labelComponent
            }

            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'8px'}}>
                {
                    extraInfo ? <p className='extra-info'>{extraInfo}</p>: ''
                }
                <CheckBox
                    handleChange={handleChange}
                    checkedValue={checkedValue}
                    value={objectValue.value}
                    isDisabled={isDisabled}
                />
            </div>
        </Flex>
    </label>)

}