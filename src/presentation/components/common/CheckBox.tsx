import './styles/SideBar.css';
import {Checkbox, ConfigProvider, Flex} from "antd";
import {upperCaseOneWord} from "../../utilities";

type Props ={
    grupo:string,
    startChecked:boolean
}


export const CheckBox = ({grupo,startChecked}:Props)=>{
    return (
        <div className='checkbox-container'>
            <Flex justify='space-between' align='center'>
                <p className="checkbok__tag">{upperCaseOneWord(grupo)}</p>
                <ConfigProvider theme={{
                    token:{
                        colorBorder:'var(--c_slate_500)',
                        borderRadiusSM:2,
                        lineWidth:2
                    }
                }}>
                    <Checkbox defaultChecked={startChecked} value={grupo}></Checkbox>
                </ConfigProvider>
            </Flex>
        </div>
    )
}