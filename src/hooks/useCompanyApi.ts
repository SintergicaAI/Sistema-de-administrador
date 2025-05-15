import {CompanyApi} from "../infrastructure/api/CompanyApi.ts";

export const useCompanyApi = () => {

    return new CompanyApi();
};
