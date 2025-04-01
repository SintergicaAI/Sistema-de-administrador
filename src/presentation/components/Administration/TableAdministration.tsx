import {Table, TableProps, Flex} from "antd";
import {Avatar} from "../common";
import {useEffect, useState} from "react";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {DataType} from "./types/TableAdministrationTypes.ts";
import {useAdministration, valueAdministrationContext} from "../../context/Administration";
import {UserSearchParams} from "../../../domain/repositories/CompanyRepository.ts";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {RenderGroups} from "./RenderGroups.tsx";
import { formatData } from "../../utilities";

const DEFAULT_PAGE_SIZE = 5; // Introduced constant for better clarity

const operationTable = new CompanyApi();
const getAllUser = new GetAllUserCompanyData(operationTable);

//Filtering Methods
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

export const TableAdministration = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const [filterData, setFilterData] = useState<DataType[]>([]);


    const {
        changeSelectedRow,
        selectedRow,
        changeHasSelected,
        setTotalItemsTable,
        totalItemsTable,
        searchText,
        dataTable,
        changeDataTabla,
        setLoadingTable,
        filters,
        loadingTable,
    }: valueAdministrationContext = useAdministration();

    const [searchParams, setSearchParams] = useState<UserSearchParams>({
        query: "",
        size: DEFAULT_PAGE_SIZE,
        page: 1,
    });

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

    const filteringData = () => {
        const filteredData = filterByQuery(searchText, dataTable);
        const dataAfterFilters = filterByGroups(filters, filteredData);
        setSearchParams((prev) => ({...prev, page: 1}));
        setFilterData(dataAfterFilters);
        setTotalItemsTable(dataAfterFilters.length);
    };


    const changeDataRow = () =>{
        const newDataRow = {...(selectedRow as DataType) };
        console.log(newDataRow);

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
            changeSelectedRow(selectedRow);
        },
        // Disable and visually hide radio buttons
        getCheckboxProps: () => ({
            disabled: true,
            style: {display: "none"},
        }),
    };

    const columns: TableProps<DataType>["columns"] = [
        {
            title: "Usuario",
            dataIndex: "fullName",
            key: "fullName",
            render: (name) => (
                <Flex align="center" gap="var(--sm-space)">
                    <Avatar name={name} type={"active"}/>
                    {name}
                </Flex>
            ),
        },
        {
            title: "Rol",
            key: "role",
            dataIndex: "role",
        },
        {
            title: "Correo",
            key: "email",
            dataIndex: "email",
        },
        {
            title: "Grupos",
            key: "groups",
            dataIndex: "groups",
            render: (array: string[], record) => <RenderGroups groups={array} record={record}/>,
        },
    ];

    return (
        <Table<DataType>
            dataSource={filterData}
            columns={columns}
            rowSelection={{...rowSelection, hideSelectAll: true}}
            onRow={(record) => ({
                onClick: (event) => {
                    // Toggle row highlight when clicked
                    document
                        .querySelector(".ant-table-row-selected")
                        ?.classList.remove("ant-table-row-selected");
                    const target = event.target as HTMLTableElement;
                    target.closest("tr")?.classList.toggle("ant-table-row-selected");
                    changeSelectedRow(record);
                    changeHasSelected(true);
                },
            })}
            loading={loadingTable}
            pagination={{
                pageSize: searchParams.size,
                current: searchParams.page,
                total: totalItemsTable,
                showSizeChanger: true,
                onChange: (page, pageSize) => {
                    setLoadingTable(true);
                    setSearchParams({...searchParams, page: page, size: pageSize});
                    changeHasSelected(false);
                    setLoadingTable(false);
                },
                position: ["bottomCenter"],
                pageSizeOptions: [5, 10, 20, 50],
            }}
        />
    );
};