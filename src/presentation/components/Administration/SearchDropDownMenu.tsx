import {Search} from "lucide-react";
import {Dispatch, useContext, useRef, useState} from "react";
import {Button, Input, Flex,InputRef} from "antd";
import {
    AdministrationContext,
    valueAdministrationContext
} from "../../context/Administration/";
import { X } from 'lucide-react';

const handleSearch = ()=>{

}

const DropDownMenu = ({isVisible,setIsVisible}:
                      {isVisible:boolean,setIsVisible:Dispatch<any>}) => {
    const {changeSearchText}:valueAdministrationContext = useContext(AdministrationContext);
    const inputRef = useRef<InputRef>(null);

    setTimeout(()=>{
        inputRef.current?.select();
    },1000)
    return (<div className={`dropdown-menu ${isVisible ? "js-visible" : ""}`}>
                <Input.Search placeholder={"Nombre o rol que deseas buscar"}
                              style={{marginBottom:'var(--base-space)'}}
                              onSearch={(value) => {
                                  changeSearchText(value as string);
                              }}
                              enterButton={true}
                              ref={inputRef}
                />
                <Flex justify="space-between" align="center">
                    <Button onClick={()=>{changeSearchText('')}}>Reset</Button>
                    <X onClick={()=>{setIsVisible(!isVisible)}}/>
                </Flex>
            </div>)
}


export const SearchDropDownMenu = ()=>{

    const [isVisible,setIsVisible]=useState(false);

    return (<div className="dropdown-menu-container">
        <Search onClick={() =>{
            setIsVisible(!isVisible);
        }}/>
        {<DropDownMenu isVisible={isVisible} setIsVisible={setIsVisible}/>}
        </div>)
}