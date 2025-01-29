import {useEffect, useState} from "react";
import {useAsyncValue} from "react-router";

type ErrorType = {
    code: number;
    message: string
} | null;

const useFetch = (endpoint:string, typeMethond = "GET",values = {}, token:string = "") => {
    const BASE_URL = "http://192.168.3.245:8080/";

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
        const objectConfiguration:RequestInit = (typeMethond === "GET") ? {
            method: `${typeMethond}`,

        }: (values.){
            method: `${typeMethond}`,
            body: JSON.stringify(values)
        }


        try{
            const res = await fetch(`${BASE_URL}${endpoint}`,{...objectConfiguration});

            //Sleep
            await new Promise(resolve=>{setTimeout(resolve,1000)});
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
    }
}
export default useFetch;