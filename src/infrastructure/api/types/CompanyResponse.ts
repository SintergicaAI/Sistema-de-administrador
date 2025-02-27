interface groupDTO {
    id:number;
    name:string;
}

export interface UserDTO{
    id:string;
    name:string;
    lastName:string;
    email:string;
    groupsDTO:groupDTO[];

}
