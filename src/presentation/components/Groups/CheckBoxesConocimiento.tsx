import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {Tag} from "../common/Tag.tsx";
import {ChangeEvent} from "react";

const tags = [{
    color:'green',
    text:'General',
    value:'general'
    },{
    color:'red',
    text:'Finanzas',
    value:'finanzas',
},{
    color:'blue',
    text:'Ventas',
    value:'ventas'
},{
    color:'',
    text:'General  2',
    value:'general'
}]

export const CheckBoxesConocimiento = ()=>{

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{

    }

    return (
        <Flex vertical gap={16}>
            {
                tags.map((item) =>(
                    <CheckboxContainer
                        labelComponent={<Tag text={item.text} color={item.color}/>}
                        objectValue={{value:item.value,name:item.value}}
                        checkedValue={["ventas","finanzas"]}
                        extraInfo={"12 archivos"}
                        handleChange={handleCheckBoxGroup}/>
                ))
            }
        </Flex>
    )
}