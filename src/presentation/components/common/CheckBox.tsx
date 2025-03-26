import './styles/SideBar.css';
import {Flex} from "antd";
import {upperCaseOneWord} from "../../utilities";
import { SquareCheckBig } from 'lucide-react';
import {ChangeEvent} from "react";

type Props ={
    grupo:string,
    checkedValue:string[],
    handleChange:(event:ChangeEvent<HTMLInputElement>) => void,
    groupSize:number |  undefined,
    isDisabled?:boolean,
}


export const CheckBox = ({
                             grupo,
                             checkedValue,
                             groupSize,
                             handleChange,
                         isDisabled}:Props)=>{
    return (
        <label className='checkbox-container'>
            <Flex justify='space-between' align='center'>
                <p className="checkbok__tag">{upperCaseOneWord(grupo)}</p>

                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap:'8px'}}>
                    <p style={{color:'var(--c_slate_400)'}}>{groupSize} miembros</p>
                    <input
                        name={'grupo'}
                        value={grupo}
                        type="checkbox"
                        onChange={handleChange}
                        checked={checkedValue.includes(grupo)}
                        disabled={isDisabled}
                           />
                    <SquareCheckBig/>
                </div>
            </Flex>
        </label>
    )
}