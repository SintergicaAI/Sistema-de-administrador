
export function filteringData<Type>(filteringValue:string,
                                    collection:Type[] | null,
                                    inmutableData:Type[],
                                    callback:(value:React.SetStateAction<Type[]|null>) => void){
    if(filteringValue.length != 0){
        const filtered
            = collection?.filter(item => item.name.toLowerCase().includes(filteringValue.toLowerCase())) ?? []
        callback(filtered);
    }
    else{
        callback([...inmutableData])
    }
}