import {TableOperationRepository} from "../../domain/repositories/TableOperationRepository.ts";

const LOCAL_TEST = 'http://localhost:300';
/*http://localhost:3000/users?_page=1&_per_page=5*/

export class LocalOperation  implements TableOperationRepository{


    async getAllUsersFromCampany(page: number, size: number): Promise<any[]> {
        const response =
            await fetch(`http://localhost:3000/users?_page=${page}&_per_page=${size}`)

        if(!response.ok){
            console.log(response);
            throw new Error('Error en la solicitud de datos');
        }

        const {data,items}:{data:[],items:number}= await response.json();
        return [data.map((item:{}) =>
            (
            {...item,
               fullName:`${item.first_name} ${item.last_name}`,
                key:item.id,
            }
            )),items];
    }

}