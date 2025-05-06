import {useState,useEffect} from "react";
import {DataType} from "../presentation/components/Administration/types/TableAdministrationTypes.js";
import {RowSelectedType, useAdministration} from "../presentation/context/Administration";
import {filterByGroups, filterByQuery } from "./helpers";
import {formatData} from "../presentation/utilities";
import {CompanyApi} from "../infrastructure/api/CompanyApi.ts";
import {GetAllUserCompanyData} from "../application/use-cases/GetAllUserCompanyData.ts";
import {TableProps} from "antd";
import {UserSearchParams} from "../domain/types/CompanyTypes.ts";

const DEFAULT_PAGE_SIZE = 5;
const operationTable = new CompanyApi();
const getAllUser = new GetAllUserCompanyData(operationTable);
export const useTableAdministration = () => {

    const [filterData, setFilterData] = useState<DataType[]>([]);
    const {totalItemsTable,setTotalItemsTable} = useAdministration();
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [searchParams, setSearchParams] = useState<UserSearchParams>({
        query: "",
        size: DEFAULT_PAGE_SIZE,
        page: 1,
    });

    const {loadingTable,
        setLoadingTable,
        searchText,
        filters,
        dataTable,
        changeDataTabla,
        changeSelectedRow,
        changeHasSelected,
        selectedRow} = useAdministration();

    const onPageChange = (page: number, pageSize:number) => {
        setLoadingTable(true);
        setSearchParams({...searchParams, page: page, size: pageSize});
        changeHasSelected(false);
        setLoadingTable(false);
    }
    const filteringData = () => {
        const filteredData = filterByQuery(searchText, dataTable);
        const dataAfterFilters = filterByGroups(filters, filteredData);
        setSearchParams((prev) => ({...prev, page: 1}));
        setFilterData(dataAfterFilters);
        setTotalItemsTable(dataAfterFilters.length);
    };

    const prepareData = () => {
        setLoadingTable(true);
        getAllUser.execute({}).then((result) => {
            const {users, total} = result;
            changeDataTabla(users);
            setFilterData(formatData(users));
            setLoadingTable(false);
            setTotalItemsTable(total);
        });
    };

    const changeDataRow = () =>{
        const newDataRow = {...(selectedRow as DataType) };

        const newData =  filterData.map((dataItem) => {
            if(dataItem.key === newDataRow.key) {
                return {...newDataRow}
            }else{
                return dataItem;
            }

        })
        changeDataTabla(newData);
        setFilterData(newData);
    }

    const rowSelection: TableProps<DataType>["rowSelection"] = {
        selectedRowKeys,
        type: "radio",
        preserveSelectedRowKeys: true,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            setSelectedRowKeys(selectedRowKeys as string[]);
            const [selectedRow] = selectedRows;
            changeSelectedRow(selectedRow as RowSelectedType);
        },
        // Disable and visually hide radio buttons
        getCheckboxProps: () => ({
            disabled: true,
            style: {display: "none"},
        }),
    };

    // Consolidated useEffect to handle both `filters` and `searchText`
    useEffect(() => {
        filteringData();
    }, [searchText, filters]);

    useEffect(() => {
        prepareData();
    }, []);

    useEffect(() => {
        changeDataRow();
    }, [selectedRow]);

    return {
        filterData,
        searchParams,
        setSearchParams,
        loadingTable,
        onPageChange,
        rowSelection,
        changeSelectedRow,
        changeHasSelected,
        setLoadingTable,
        totalItemsTable,
    }
}