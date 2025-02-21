//Structure of Api responses for Administration and future page with tables

type group = {
    id: string;
    name: string;
}

interface AdministrationApiResponse{
    email: string;
    name: string;
    lastName: string;
    groupDTOList: number|group[];
}
export type {AdministrationApiResponse}