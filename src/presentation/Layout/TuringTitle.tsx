import {Flex,Typography} from "antd";

const {Title} = Typography;

type Props = {
    position: "center" | "left" | "right";
}

export const TuringTitle = ({position}:Props) =>{
    return (
        <Flex justify={position} gap={12} >
            <div>
                <img src="/src/assets/brand.svg" alt="Logo de la empresa SintergicaIA" width={50} height={50} />
            </div>
            <Title>Turing</Title>
        </Flex>
    )
}