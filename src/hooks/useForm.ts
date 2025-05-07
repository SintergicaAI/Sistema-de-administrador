import {useState} from "react";
export function useForm<Type> (initialValues:Type)  {
    const [inputValores,setInputValues] = useState(initialValues)

    const onInputChange = ({target}:{target:HTMLInputElement})=>{
        const {name,value} = target;
        setInputValues({
            ...inputValores,
            [name]:value //Computed properties
        })
    }

    const onReset = ()=>{
        setInputValues(initialValues)
    }

    return {
        ...inputValores,
        formState:inputValores,
        onInputChange,
        onReset,
    }

}