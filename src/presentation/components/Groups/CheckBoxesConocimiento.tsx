import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {Tag} from "../common/Tag.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {filteringData} from "../../utilities/filteringData.ts";
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
    const [groupsSelected, setGroupsSelected] = useState<string[]>(conocimientoTagsSelected.map(item => item.value));
    const [tagsGroups,setTagsGroups] = useState<Tags[]>([...tags]);

    const handleCheckBoxGroup = (value:ChangeEvent<HTMLInputElement>) =>{
        const {target} = value;
        if(target.checked){
            const checkedValue = target.value;
            setGroupsSelected([...groupsSelected,checkedValue]);
            const color = getColor(value);
            setConocimientoTagsSelected([...conocimientoTagsSelected,
                {color:color,
                filterValue:target.value,
                value:target.value,
                text:target.value}]);
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


    useEffect(() => {
        const filter = filteringData<Tags>(filterValue,tagsGroups,tags);
        setTagsGroups(filter);
    }, [filterValue]);

    return (
        <Flex vertical gap={16}>
            {
                tagsGroups.length > 0 ?
                tagsGroups.map((item) =>(
                    <CheckboxContainer
                        key={item.value}
                        labelComponent={<Tag text={item.text} color={item.color}/>}
                        objectValue={{value:item.value,name:item.value}}
                        checkedValue={groupsSelected}
                        extraInfo={"12 archivos"}
                        handleChange={handleCheckBoxGroup}/>
                )) : 'Sin grupos de conocimiento'
            }
        </Flex>
    )
}