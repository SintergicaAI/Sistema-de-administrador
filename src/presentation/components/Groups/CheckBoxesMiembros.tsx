import {Flex} from "antd";
import {CheckboxContainer} from "../common";
import {AvatarWithName} from "../common/AvatarWithName.tsx";
import { Spin } from 'antd';
import {useCheckBoxesMiembros} from "../../../hooks";

export const CheckBoxesMiembros = ({filterValue}:{filterValue:string}) =>{

    const {handleCheckBoxGroup,
        listUsersFromCompany,
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
                listUsersFromCompany.length > 0 ?
                    listUsersFromCompany.map((member) => (
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