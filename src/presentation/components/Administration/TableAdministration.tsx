import {Table, TableProps, Flex} from "antd";
import {Avatar} from "../common";
import {DataType} from "./types/TableAdministrationTypes.ts";
import {RowSelectedType} from "../../context/Administration";
import {RenderGroups} from "./RenderGroups.tsx";
import {useTableAdministration} from "../../../hooks";
import {GroupType} from "../../../domain/types/CompanyTypes.ts";

export const TableAdministration = () => {

    const {filterData,
        searchParams,
        loadingTable,
        onPageChange,
        totalItemsTable,
        rowSelection,
        changeSelectedRow,
        changeHasSelected} = useTableAdministration();


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
            render: (array: GroupType[], record) => <RenderGroups groups={array} record={record}/>,
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
                    changeSelectedRow(record as RowSelectedType);
                    changeHasSelected(true);
                },
            })}
            loading={loadingTable}
            pagination={{
                pageSize: searchParams.size,
                current: searchParams.page,
                total: totalItemsTable,
                showSizeChanger: true,
                onChange: onPageChange,
                position: ["bottomCenter"],
                pageSizeOptions: [5, 10, 20, 50],
            }}
        />
    );
};