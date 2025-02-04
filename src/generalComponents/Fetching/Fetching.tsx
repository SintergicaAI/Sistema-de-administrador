import useFetch from "../../hooks/useFetch.tsx";
import {Home} from "../../Home.tsx";

export const Fetching = ({endpoint = '',method='',values={}}) =>{
    const {data,hasError} = useFetch(endpoint,method,values);
    console.log(data);
    return (<>
        { !hasError && <Home/> }
    </>)
}