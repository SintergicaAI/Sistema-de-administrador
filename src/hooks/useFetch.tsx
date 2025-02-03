import {useEffect, useState} from "react";

type ErrorType = {
    code: number;
    message: string
} | null;

const useFetch = (endpoint:string, typeMethond = "GET",values = {}, token:string = "") => {
    const BASE_URL = import.meta.env.VITE_API_URL;

    const [url,setUrl] = useState(BASE_URL);

    const [states, setStates] = useState<{
        data: any;
        isLoading: boolean;
        error: ErrorType;
        hasError: boolean;
    }>({
        data:null,
        isLoading: true,
        error: null,
        hasError: false,
    })

    useEffect(()=>{
        getData();
    },[endpoint])

    const changeUrl = (newEndpoint:string) => {
        setUrl(newEndpoint);
    }

    const setLoadingState = ()=>{
        setStates({
            data:null,
            isLoading: true,
            error: null,
            hasError: false,
        })
    }

    const getData = async () => {
        setLoadingState();

        /*Extenderlo para que acepte otro tipo de metodos*/
        let objectConfiguration:RequestInit = (JSON.stringify(values) === "{}") ? {
            method: `${typeMethond}`,
            headers: {
                ContentType: "application/json",
            }
        }: {
            method: `${typeMethond}`,
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }

        objectConfiguration = (token === "") ? objectConfiguration:{
            ...objectConfiguration,
            headers:{
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            }
        }


        try{
            const res = await fetch(`${url}${endpoint}`,{...objectConfiguration});

            //Sleep
            //await new Promise(resolve=>{setTimeout(resolve,1000)});
            if(!res.ok){
                setStates({
                    data:null,
                    isLoading: false,
                    hasError: false,
                    error:{
                        code: res.status,
                        message: res.statusText,
                    }
                })
                return;
            }
            const data = await res.json();
            setStates({
                data:data,
                isLoading: false,
                error: null,
                hasError: false,
            });

        }catch(error:any){
            setStates({
                data:null,
                isLoading: false,
                error: error?.toString(),
                hasError: true,
            })
        }


    }

    return {
        data:states.data,
        isLoading: states.isLoading,
        hasError: states.hasError,
        changeUrl,
    }
}
export default useFetch;