import {Flex,Typography} from "antd";

const {Title} = Typography;

export const TuringTitle = () =>{
    return (
        <Flex justify={"center"} gap={12} >
            <div>
                <img src="/src/assets/brand.svg" alt="Logo de la empresa SintergicaIA" width={50} height={50} />
            </div>
            <Title>Turing</Title>
        </Flex>
    )
}