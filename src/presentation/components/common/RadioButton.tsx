import {Radio} from "antd";
import './styles/SideBar.css';

type Props = {
    rol:string,
    name:string,
}

export const RadioButton = ({rol,name}:Props) =>{
    return (
        <>
            <p style={{display:"inline-block", color:"black", width:30,height:30}}>Hola</p>
        <div  className="radio-button">
            <input type="radio"
                id={rol}
                value={rol.toLowerCase()}
               name={name}
            />
        </div>
        </>

    )
}