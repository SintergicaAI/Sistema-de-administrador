import {GroupRepository} from "../../domain/repositories/GroupRepository.ts";
import {GetGroupDTO} from "../../domain/types/CompanyTypes.ts";


export class GroupApi implements GroupRepository{
    getGroups(): Promise<GetGroupDTO> {
        return Promise.resolve(undefined);
    }


}