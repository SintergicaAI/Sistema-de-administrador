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

    /*const onFinishFailed: FormProps<Type>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
        messageApi.open({
            type:'error',
            content:'Ingresa los campos de manera correcta'
        });

    };*/

    /*const onFinish:  FormProps<Type>['onFinish'] = (values) => {
        messageApi.open({
            type:'loading',
            content:'Enviando datos...',
        })

        callback(values).then(()=>{
            messageApi.destroy();
            messageApi.open({
                type: 'loading',
                content: 'Iniciando sesion...',
                duration: 2,
            }).then(() => navigate("/"))

        }).catch(()=>{
            messageApi.destroy();
            messageApi.open({
                type:'error',
                content:'Tus datos no se enviaron correctamente',
                duration:3,
            })
        })
    }*/

    return {
        ...inputValores,
        formState:inputValores,
        onInputChange,
        onReset,
    }

}