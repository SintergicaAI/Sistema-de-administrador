import {FilteredValue} from "../components/common/CommonTypes.ts";

export function filteringData<Type extends FilteredValue>(filteringValue:string,
                                    collection:Type[] | null,
                                    inmutableData:Type[]){
    if(filteringValue.length != 0){

        return collection?.filter(item => {
                return item.filterValue.toLowerCase().includes(filteringValue.toLowerCase())
            })
            ?? [];
    }
    else{
        return inmutableData;
    }
}