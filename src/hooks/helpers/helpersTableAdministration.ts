//Filtering Methods
import {DataType} from "../../presentation/components/Administration/types/TableAdministrationTypes.ts";

const filterByQuery = (query: string, data: DataType[]) =>
    query.length > 0
        ? data.filter((dataItem) =>
            dataItem.fullName.toLowerCase().includes(query.toLowerCase())
        )
        : data;

const filterByGroups = (activeFilters: string[], data: DataType[]) =>
    activeFilters.length > 0
        ? data.filter((dataItem) => {
            if (dataItem.groups && dataItem.groups.length !== 0) {
                const userGroups = dataItem.groups.map((group) =>
                    group.name.toLowerCase()
                );
                return userGroups.some((group) => activeFilters.includes(group));
            }
            return false;
        })
        : data;

export {filterByQuery, filterByGroups}