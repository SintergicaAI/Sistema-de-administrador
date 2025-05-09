import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import { Spin } from 'antd';
import {useCheckBoxesMiembros} from "../../../hooks";


//Todo: change where we request the group members values.
export const CheckBoxesMiembros = ({filterValue}:{filterValue:string}) =>{

    const {handleCheckBoxGroup,
        filteredData,
        checkedValues,
        loading}= useCheckBoxesMiembros(filterValue);

    if(loading){
        return (<>
            <Spin spinning={loading}></Spin>
            </>)
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