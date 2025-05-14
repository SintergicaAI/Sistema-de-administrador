import {Input, Spin} from "antd";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {ChangeEvent, useRef, useState} from "react";
import {GroupApi} from "../../../infrastructure/api/GroupApi.ts";
import { useMutation } from "@tanstack/react-query";
import {useParams} from "react-router";
import {ChangeGroupName} from "../../../application/use-cases/ChangeGroupName.ts";


const groupApi = new GroupApi();
const changeNameToGroup = new ChangeGroupName(groupApi);

type Data = {
    groupKey: string;
    name: string;
}

export const InputChangeNameGroup = ()=>{
    const {actualGroupName, setActualGroupName, setAlertConfiguration, setShowAlert} = useGroupContext();
    const [inputValue,setInputValue] = useState(actualGroupName);
    const inputRef = useRef(null);
    const {groupId} = useParams();

    const mutation = useMutation({
        mutationKey:["change name",actualGroupName],
        mutationFn: async (data:Data) => {
            return await changeNameToGroup.execute(data.groupKey,data.name);
        },
        onSuccess: ()=>{
            setShowAlert(true);
            setAlertConfiguration({type:"success",message:"Cambio de nombre"});
        },
        onError: ()=>{
            setShowAlert(true);
            setAlertConfiguration({type:"error",message:"No se pudo cambiar nombre"});
        }
    })

    const handleChange = (value:ChangeEvent<HTMLInputElement>)=>{

        const {target} = value;
        const newValue = target.value.length > 0 ? target.value : ' ';

        setInputValue(newValue);
        setActualGroupName(newValue);
    }

    const handleChangeName = ()=>{
        const id = groupId ?? "";
        const data:Data = {
            groupKey:id,
            name:inputValue,
        }
        mutation.mutate(data);
    }

    return (
        <>
            <Spin fullscreen spinning={mutation.isPending}></Spin>
            <Input
                value={inputValue}
                ref={inputRef}
                placeholder="Ingresa nombre del grupo"
                defaultValue={actualGroupName}
                onChange={(e)=> handleChange(e)}
                onPressEnter={()=> handleChangeName()}
                style={{fontSize:20,fontWeight:700 ,paddingInline:0}}
                variant="borderless" />
        </>
    )
}