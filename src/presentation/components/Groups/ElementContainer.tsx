import {Button} from 'antd';
import {ReactNode} from "react";
import './style/ElementContainer.css';
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import type {SideContentType} from "../../context/Group/GroupContext.tsx";

type Props = {
    labelText: string,
    buttonText:string,
    id: SideContentType,
    containerChild:ReactNode,
    iconButton:JSX.Element,

}

export const ElementContainer =
    ({  labelText,
         buttonText,
         iconButton,
            id,
         containerChild}:Props)=>{

    const {setHasSelected,
        setSideContent,
        setSideHeaderText} = useGroupContext();

    const openSidebar = () => {
        setHasSelected(true);
        setSideContent(id);
        setSideHeaderText(labelText);
    }

    return (<section className='element-section'>
            <div className='flex-container'>
                <p className='element-label'>{labelText}</p>
                <Button
                    onClick={openSidebar}
                    variant={'outlined'}
                    color={'primary'}
                    icon={iconButton}>{buttonText}</Button>
            </div>
            <div className='element-container'>
                {containerChild}
            </div>
        </section>)
}