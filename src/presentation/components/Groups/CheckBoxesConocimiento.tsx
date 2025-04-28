import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {Tag} from "../common/Tag.tsx";
import {ChangeEvent, useState} from "react";

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
    value:'general2'
}]

export const CheckBoxesConocimiento = ()=>{

    //todo:This value is going to be fetched from the groupAPI
    const [groupsSelected, setGroupsSelected] = useState<string[]>(["general","finanzas"]);
    const handleCheckBoxGroup = ({target}:ChangeEvent<HTMLInputElement>) =>{
        if(target.checked){
            const checkedValue = target.value;
            setGroupsSelected([...groupsSelected,checkedValue]);
        }else{
            const withoutCheckedValue =
                groupsSelected.filter((item)=>item.toLowerCase() !== target.value.toLowerCase());
            setGroupsSelected([...withoutCheckedValue]);
        }
    }

    return (
        <Flex vertical gap={16}>
            {
                tags.map((item) =>(
                    <CheckboxContainer
                        labelComponent={<Tag text={item.text} color={item.color}/>}
                        objectValue={{value:item.value,name:item.value}}
                        checkedValue={groupsSelected}
                        extraInfo={"12 archivos"}
                        handleChange={handleCheckBoxGroup}/>
                ))
            }
        </Flex>
    )
}