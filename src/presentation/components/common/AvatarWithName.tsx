import {Avatar} from "./index.ts";
import {Flex} from "antd";

type Props = {
    fullName:string;
}

export const AvatarWithName = ({fullName}:Props) =>{
    return (
        <Flex align="center" gap="var(--sm-space)">
            <Avatar name={fullName} type={"active"}/>
            {fullName}
        </Flex>
        )
}