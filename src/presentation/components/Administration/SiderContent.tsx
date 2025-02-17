
import {Roles} from "../../../domain/enums/UserRole.ts";
import {Groups} from "../../../domain/enums/UserGroups.ts";
import {Radio, Checkbox, Flex} from 'antd';
import type { RadioChangeEvent } from 'antd';
import {CSSProperties, useEffect, useState} from "react";
import {ConfigProvider} from "antd";
import './styles/administration.css';

const onChange = (e: RadioChangeEvent) => {
    console.log(`radio checked:${e.target.value}`);
};


const radioButtonStyle:CSSProperties = {
    borderRadius:'var(--sm-radius)',

}

const CheckboxContainer = ( {grupo,startChecked}:{grupo:string,startChecked:boolean}) =>{
    return (
        <div className='checkbox-container'>
            <Flex justify='space-between' align='center'>
                <p>{grupo}</p>
                <ConfigProvider theme={{
                    token:{
                        colorBorder:'var(--c_slate_500)',
                        borderRadiusSM:2,
                        lineWidth:2
                    }
                }}>
                    <Checkbox defaultChecked={startChecked}></Checkbox>
                </ConfigProvider>
            </Flex>
        </div>
    )

}


export const Content = ({groups,rol}:{groups:string[],rol:string}) =>{

    /*const [rolUser, setRolUser] = useState(rol);*/
    //console.log(`Grupos:${groups.toString()} y roles:${rol}`);

    const isChecked = (group:string):boolean => {

        return groups.includes(group);
    }

   /* useEffect(() => {
        setRolUser(rol);
        console.log(`Cambio de rol ${rolUser}`)
    }, [rol,groups]);*/

    return (
        <div style={{color:'var(--c_slate_500:#64748B)'}}>
            <p className="label">Rol</p>
            <Radio.Group onChange={onChange} defaultValue={rol.toLowerCase()}
                         style={{display: "flex", flexDirection: "column", gap:3}}>

                {/*PREGUNTA:Lo ideal no seria hacer una peticion al backend y traer los roles?*/}

                {Roles.map((role) =>(<Radio.Button
                    key={role}
                    value={role.toLowerCase()}
                    style={radioButtonStyle}
                >{role}</Radio.Button>))}

            </Radio.Group>
            <p className="label">Grupos</p>
            <Flex vertical gap={3}>
                {
                    Groups.map((group) =>(<CheckboxContainer
                        key={group}
                        grupo={group}
                        startChecked={isChecked(group)}
                    />))
                }
            </Flex>
        </div>
    )
}