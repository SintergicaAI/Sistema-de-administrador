export interface FilteredValue {
    filterValue:string
}
export type AlertConfigurationType = {
    message: string,
    type: "success" | "info" | "warning"|"error"| undefined,
    description?: string,
}