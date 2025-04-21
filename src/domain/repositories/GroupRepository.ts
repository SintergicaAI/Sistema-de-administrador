import {GetGroupDTO} from "../types/CompanyTypes.ts";

export interface GroupRepository {
    getGroups():Promise<GetGroupDTO>;
}