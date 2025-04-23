import {Button} from 'antd';
import {ReactNode} from "react";
import './style/ElementContainer.css';

type Props = {
    labelText: string,
    buttonText:string,
    containerText:ReactNode,
    iconButton:JSX.Element,
}

export const ElementContainer =
    ({  labelText,
         buttonText,
         iconButton,
         containerText}:Props)=>{
    return (<section className='element-section'>
            <div className='flex-container'>
                <p className='element-label'>{labelText}</p>
                <Button
                    variant={'outlined'}
                    color={'primary'}
                    icon={iconButton}>{buttonText}</Button>
            </div>
            <div className='element-container'>
                {containerText}
            </div>
        </section>)
}