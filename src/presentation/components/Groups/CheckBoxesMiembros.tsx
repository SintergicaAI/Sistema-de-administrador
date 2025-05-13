import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import { Spin } from 'antd';
import {useCheckBoxesMiembros} from "../../../hooks";


export const CheckBoxesMiembros = ({filterValue}:{filterValue:string}) =>{

    const {handleCheckBoxGroup,
        filteredData,
        checkedValues,
        isError,
        isPending}= useCheckBoxesMiembros(filterValue);

    if(isPending){
        return (<>
            <Spin spinning={isPending}></Spin>
            </>)
    }

    if(isError){
        return (<p>Usuarios no existentes</p>)
    }

    return (
        <Flex vertical gap={8}>
            {
                filteredData.length > 0 ?
                    filteredData.map((member) => (
                        <CheckboxContainer
                            key={member.email}
                            labelComponent={<AvatarWithName fullName={`${member.firstName} ${member.lastName}`}/>}
                            objectValue={{value: member.email, name:""}}
                            checkedValue={checkedValues}
                            handleChange={handleCheckBoxGroup}/>
                    )) : <p>Usuarios no existentes</p>
            }
        </Flex>
    )
}