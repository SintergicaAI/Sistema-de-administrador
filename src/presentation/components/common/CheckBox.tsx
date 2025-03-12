import './styles/SideBar.css';
import {Checkbox, ConfigProvider, Flex} from "antd";
import {upperCaseOneWord} from "../../utilities";
import { SquareCheckBig } from 'lucide-react';
import {ChangeEvent, useEffect} from "react";

type Props ={
    id:string,
    grupo:string,
    checkedValue:string[],
    handleChange:(event:ChangeEvent<HTMLInputElement>) => void,
}


export const CheckBox = ({id,grupo,checkedValue,handleChange}:Props)=>{

    return (
        <label className='checkbox-container'>
            <Flex justify='space-between' align='center'>
                <p className="checkbok__tag">{upperCaseOneWord(grupo)}</p>

                <div>
                    <input
                        id={id}
                        name={'grupo'}
                        value={grupo}
                        type="checkbox"
                        onChange={handleChange}
                        checked={checkedValue.includes(grupo)}
                           />
                    <SquareCheckBig/>
                </div>
            </Flex>
        </label>
    )
}