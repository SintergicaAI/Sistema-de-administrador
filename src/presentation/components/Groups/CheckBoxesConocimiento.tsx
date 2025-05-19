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
    filterValue:'general',
    fileSize:6
    },{
    color:'red',
    text:'Finanzas',
    value:'finanzas',
    filterValue:'finanzas', fileSize: 10
},{
    color:'blue',
    text:'Ventas',
    value:'ventas',
    filterValue:'ventas',
    fileSize:8
},{
    color:'',
    text:'General  2',
    value:'general2',
    filterValue:'general2',
    fileSize: 12,
},{
    color:'yellow',
    text:'Onboarding',
    value:'onboarding',
    filterValue:'general2',
    fileSize: 10
},
{
    color:'red',
    text:'Tech',
    value:'tech',
    filterValue:'tech',
    fileSize:15,
},
{
    color:'sky',
    text:'Legal',
    value:'legal',
    filterValue:'legal',
    fileSize: 12,
}
]

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
    const [tagsGroups] = useState<Tags[]>([...tags]);

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
                fileSize: tags.find(item => target.value === item.value)?.fileSize ?? 0,
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
                        extraInfo={`${String(item.fileSize)} archivos`}
                        handleChange={handleCheckBoxGroup}/>
                )) : 'Sin grupos de conocimiento'
            }
        </Flex>
    )
}