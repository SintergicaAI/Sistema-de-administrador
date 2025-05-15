import { FilteredValue } from "../common/CommonTypes.ts";

export interface CompanyType extends FilteredValue {
    //id: React.Key | null | undefined;
    rfc: string,
    name: string,
    address: string
}
