export interface FilteredValue {
    filterValue:string
}
export type AlertConfigurationType = {
    message: string,
    description: string,
    type: "success" | "info" | "warning"|"error"| undefined,
}