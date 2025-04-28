import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {Tag} from "../common/Tag.tsx";
import {ChangeEvent, useState} from "react";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

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

const getColor = (value:ChangeEvent<HTMLInputElement>) =>{
    const {target} = value;
    console.log(target);
    const parent = target.closest("div")?.parentElement;
    if(!parent) return '';
    return parent.querySelector('.tag')?.getAttribute('data-color') ?? '';
}

export const CheckBoxesConocimiento = ()=>{


    //todo:This value is going to be fetched from the groupAPI
    const {setConocimientoTagsSelected, conocimientoTagsSelected} = useGroupContext();
    const [groupsSelected, setGroupsSelected] = useState<string[]>(conocimientoTagsSelected.map(item => item.value));

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        if(target.checked){
            const checkedValue = target.value;
            setGroupsSelected([...groupsSelected,checkedValue]);
            const color = getColor(value);
            console.log("Color del tag:"+ color);
            setConocimientoTagsSelected([...conocimientoTagsSelected,{color:color,value:target.value,text:target.value}]);
        }else{
            const removedValue = target.value;
            const withoutCheckedValue =
                groupsSelected.filter((item)=>item.toLowerCase() !== removedValue.toLowerCase());
            setGroupsSelected([...withoutCheckedValue]);

            const newTagsSelected =
                conocimientoTagsSelected.filter((item)=> item.value !== removedValue.toLowerCase());

            setConocimientoTagsSelected([...newTagsSelected]);
        }
    }


    return (
        <Flex vertical gap={16}>
            {
                tags.map((item) =>(
                    <CheckboxContainer
                        key={item.value}
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