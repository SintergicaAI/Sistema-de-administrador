import {upperCaseOneWord} from "../../utilities";
import {Tooltip} from "antd";

export const LabelComponent = ({name}:{name:string})=>{
    return (
        <Tooltip title={upperCaseOneWord(name)}>
            <p className="groups__tag">{upperCaseOneWord(name)}</p>
        </Tooltip>
    )
}