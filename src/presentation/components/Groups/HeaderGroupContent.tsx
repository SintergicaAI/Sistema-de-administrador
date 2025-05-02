import {Flex, Typography} from "antd";
import {useNavigate, useParams} from "react-router";
import {upperCaseOneWord} from "../../utilities";
const {Title} = Typography;
import { Undo2} from 'lucide-react';
import {CSSProperties} from "react";
import {DeleteGroupButton} from "./ModalDeleteGroup/DeleteGroupButton.tsx";

const iconStyle:CSSProperties = {
    width: 20,
    height: 20,
    cursor: "pointer",

}

export const HeaderGroupContent = () => {

    let {nameGroup} = useParams();
    const navigate= useNavigate();

    return (
        <Flex style={{height:'100%'}} justify={'space-between'} align={'center'}>

            <Flex style={{lineHeight:1}} align={'center'} gap={16}>
                {nameGroup &&
                    <Undo2
                        onClick={()=>{navigate(-1)}}
                    style={iconStyle}/>}

                <Title style={
                    {
                        fontWeight:'bold',
                        color:`${ nameGroup ? '#94A3B8':'initial' }`,
                        marginBlock:0}}
                >Grupos</Title>
                {
                    nameGroup && (
                            <p className="groups__tag">{upperCaseOneWord(nameGroup)}</p>
                    )
                }
            </Flex>
            {
                nameGroup && <DeleteGroupButton/>
            }


        </Flex>
    )
}