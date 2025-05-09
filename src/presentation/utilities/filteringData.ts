import {FilteredValue} from "../components/common/CommonTypes.ts";

export function filteringData<Type extends FilteredValue>(filteringValue:string,
                                    collection:Type[],
                                    inmutableData:Type[]){
    if(filteringValue.length != 0){

        return collection?.filter(item => {
                return item.filterValue.toLowerCase().includes(filteringValue.toLowerCase())
            });
    }
    else{
        return inmutableData;
    }
}
export function filterData<Type extends FilteredValue>(filteringValue:string,
                                                          inmutableData:Type[]){
    if(filteringValue.length != 0){

        return inmutableData.filter(item => {
                return item.filterValue.toLowerCase().includes(filteringValue.toLowerCase())
            });
    }
    else{
        return inmutableData;
    }
}