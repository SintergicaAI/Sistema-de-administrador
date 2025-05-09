import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {Tag} from "../common/Tag.tsx";
import {ChangeEvent, useMemo, useState} from "react";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {filterData} from "../../utilities/filteringData.ts";
import {Tags} from "./GroupsTypes.ts";

const tags = [{
    color:'green',
    text:'General',
    value:'general',
    filterValue:'general'
    },{
    color:'red',
    text:'Finanzas',
    value:'finanzas',
    filterValue:'finanzas'
},{
    color:'blue',
    text:'Ventas',
    value:'ventas',
    filterValue:'ventas'
},{
    color:'',
    text:'General  2',
    value:'general2',
    filterValue:'general2'
}]

const getColor = (value:ChangeEvent<HTMLInputElement>) =>{
    const {target} = value;
    const parent = target.closest("div")?.parentElement;
    if(!parent) return '';
    return parent.querySelector('.tag')?.getAttribute('data-color') ?? '';
}

export const CheckBoxesConocimiento = ({filterValue}:{filterValue:string})=>{


    //todo:This value is going to be fetched from the groupAPI
    const {setConocimientoTagsSelected, conocimientoTagsSelected} = useGroupContext();
    const [checkedValues, setCheckedValues] = useState<string[]>(conocimientoTagsSelected.map(item => item.value));
    const [tagsGroups,setTagsGroups] = useState<Tags[]>([...tags]);

    const filteredData = useMemo(()=>{
        return filterData<Tags>(filterValue,tagsGroups);
    },[filterValue,tagsGroups]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        if(target.checked){
            const checkedValue = target.value;
            setCheckedValues([...checkedValues,checkedValue]);
            const color = getColor(value);
            setConocimientoTagsSelected([...conocimientoTagsSelected,
                {color:color,
                filterValue:target.value,
                value:target.value,
                text:target.value}]);
        }else{
            const removedValue = target.value;
            const withoutCheckedValue =
                checkedValues.filter((item)=>item.toLowerCase() !== removedValue.toLowerCase());
            setCheckedValues([...withoutCheckedValue]);

            const newTagsSelected =
                conocimientoTagsSelected.filter((item)=> item.value !== removedValue.toLowerCase());

            setConocimientoTagsSelected([...newTagsSelected]);
        }
    }

    return (
        <Flex vertical gap={16}>
            {
                filteredData.length > 0 ?
                    filteredData.map((item) =>(
                    <CheckboxContainer
                        key={item.value}
                        labelComponent={<Tag text={item.text} color={item.color}/>}
                        objectValue={{value:item.value,name:item.value}}
                        checkedValue={checkedValues}
                        extraInfo={"12 archivos"}
                        handleChange={handleCheckBoxGroup}/>
                )) : 'Sin grupos de conocimiento'
            }
        </Flex>
    )
}