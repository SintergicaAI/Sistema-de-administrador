
export const sendData = async (values:object, endpoint:string)=>{
    try{

        const res = await fetch(endpoint,
            {
                method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(values),
        });
        console.log(res.body);
        const data = await res.json();
        console.log(data);
        return data;
    }catch(e) {
        throw new Error("Error en la solicitud")
    }
}