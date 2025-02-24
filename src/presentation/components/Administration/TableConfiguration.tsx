import {CSSProperties} from "react";
import {Flex} from "antd";
import {SlidersHorizontal} from "lucide-react";


export const tableStyle:React.CSSProperties = {
    width: '90%',
    minWidth:'450px',
    maxWidth: '900px',
    marginInline: 'auto',
}
const iconTableConfiguration:CSSProperties = {
    width: "20px",
    height: '20px',
}

export const RenderGroups = ({groups}:{groups:string[]})=>{
    const sizeGroup = groups?.length ?? 0;
    const texto = sizeGroup >1? 'grupos': 'grupo ';
    return (<Flex align="center" gap={12}>
            <p>{sizeGroup} {texto }</p>
            <SlidersHorizontal style={iconTableConfiguration}/>
        </Flex>
    )
}


