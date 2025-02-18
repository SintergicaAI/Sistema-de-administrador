import {Search} from "lucide-react";
import {useState} from "react";
import {Input} from "antd";



const DropDownMenu = () => {
    return (<div className="dropdown-menu">
                <Input.Search/>
            </div>)
}


export const SearchDropDownMenu = ()=>{
    const [searchText, setSearchText] = useState('');
    const [isVisible,setIsVisible]=useState(false);

    return (<div>
        <Search onClick={() =>{
            setIsVisible(!isVisible);
        }}/>
        {isVisible && <DropDownMenu/>}
        </div>)
}