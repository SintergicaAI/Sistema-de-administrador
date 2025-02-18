
import {Roles} from "../../../domain/enums/UserRole.ts";
import {Groups} from "../../../domain/enums/UserGroups.ts";
import {Radio, Checkbox, Flex} from 'antd';
import type { RadioChangeEvent } from 'antd';
import {CSSProperties, useContext} from "react";
import {ConfigProvider} from "antd";
import './styles/administration.css';
import {AdministrationContext} from "../../context/Administration/AdministrationContext.tsx";
import type {DataType} from "./types/TableAdministrationTypes.ts";

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
                    <Checkbox defaultChecked={startChecked} value={grupo}></Checkbox>
                </ConfigProvider>
            </Flex>
        </div>
    )

}


export const SiderContent = () =>{

    const {selectedRow} = useContext(AdministrationContext);
    const {groups,role} = selectedRow as DataType;

    const isChecked = (group:string):boolean => {

        return groups?.includes(group as never);
    }

    return (
        <div style={{color:'var(--c_slate_500:#64748B)'}}>
            <p className="label">Rol</p>
            <Radio.Group onChange={onChange} defaultValue={role?.toLowerCase()}
                         style={{display: "flex", flexDirection: "column", gap:3}}
                         name="role"
                         value={role.toLowerCase()}
            >


                {/*PREGUNTA:Lo ideal no seria hacer una peticion al backend y traer los roles?*/}

                {Roles.map((rol) =>(<Radio.Button
                    key={rol}
                    value={rol.toLowerCase()}
                    style={radioButtonStyle}
                >{rol}</Radio.Button>))}

            </Radio.Group>
            <p className="label">Grupos</p>
            <Checkbox.Group value={[...groups]}  style={{width:"100%"}} >
                <Flex vertical gap={5} flex="1">
                    {
                        Groups.map((group) =>(<CheckboxContainer
                            key={group}
                            grupo={group}
                            startChecked={isChecked(group)}
                        />))
                    }
                </Flex>
            </Checkbox.Group>

        </div>
    )
}