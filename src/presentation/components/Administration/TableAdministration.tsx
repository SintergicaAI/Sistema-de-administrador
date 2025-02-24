import {Table, TableProps, Flex} from "antd";
import {Avatar} from "../common/Avatar.tsx";
import {useEffect, useState} from "react";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {TableOperation} from "../../../infrastructure/api/TableOperation.ts";
import {DataType} from "./types/TableAdministrationTypes.ts"
import {useContext} from "react";
import {AdministrationContext,valueAdministrationContext} from "../../context/Administration";
import {RenderGroups, tableStyle} from "./TableConfiguration.tsx";


interface RecordType {
    key:string;
}

const operationTable = new TableOperation();
const getAllUser = new GetAllUserCompanyData(operationTable);

export const TableAdministration = () =>{

    const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])

    const {changeSelectedRow,
        changeHasSelected,
        setTotalItemsTable,
        searchText}:valueAdministrationContext = useContext(AdministrationContext);

    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState(0);
    const PAGE_SIZE = 5;

    const prepareData = ()=>{
        setLoading(true);
        getAllUser.execute(currentPage,PAGE_SIZE).then(result =>{
            const [data,items] = result
            console.log(data);
            setData(data);
            setLoading(false);
            setTotalItemsTable(parseInt(items));
            setTotalRecords(items);
        })
    }

    useEffect(() => {
        prepareData();
    }, [currentPage]);
    const changeRow = (selectedRow:RecordType) => {
        changeSelectedRow(selectedRow);
    }

    const rowSelection:TableProps<DataType>['rowSelection'] ={
        selectedRowKeys,
        type:"radio",
        preserveSelectedRowKeys:true,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                setSelectedRowKeys(selectedRowKeys as string[]);
                const [selectedRow] =  selectedRows;
                changeSelectedRow(selectedRow);
        },
        //Desaparecer los radio button
        getCheckboxProps:() =>({
            disabled:true,
            style:{display: 'none'},
        })
    }

    /*TODO:Modificar mecanismo de filtrado de datos*/
    const columns: TableProps<DataType>['columns'] = [
        {
            title:'Usuario',
            dataIndex: 'fullName',
            key: 'fullName',
            filteredValue:[searchText],
            onFilter:(value, record) => {
                return record.name
                    .toString()
                    .toLowerCase()
                    .includes((value as string).toLowerCase()) ||
                    record.role.toString()
                            .toLowerCase()
                            .includes((value as string).toLowerCase())
            },
            render: (name)=>(
                <Flex align="center" gap='var(--sm-space)'>
                    <Avatar name={name}/>
                    {name}
                </Flex>
            ),

        },
        {
            title:'Rol',
            key:'role',
            dataIndex: 'role',
            filteredValue: [searchText],
        },
        {
            title:'Correo',
            key:'email',
            dataIndex: 'email',
        },
        {
            title:'Grupos',
            key:'groups',
            dataIndex: 'groups',
            render: (array:string[]) =>(<RenderGroups groups={array}/>)
        }
    ]


    return (
        <>
            <Table<DataType>
                dataSource={data}
                columns={columns}
                style={tableStyle}
                rowSelection={{...rowSelection,hideSelectAll:true}}
                onRow={(record)=>({
                    onClick: (event) => {

                        //Cambiar el color del Row cuando se da click
                        document.querySelector(".ant-table-row-selected")?.classList.remove("ant-table-row-selected");
                        let target:HTMLTableElement = event.target as HTMLTableElement;
                        target.closest('tr')?.classList.toggle('ant-table-row-selected');
                        changeRow(record);
                        changeHasSelected(true);
                    },
                })}
                loading={loading}
                pagination={{
                    pageSize:PAGE_SIZE,
                    total:totalRecords,
                    onChange:(page) =>{
                        setCurrentPage(page)
                    },
                    position:['bottomCenter']
                }}
            />
        </>
    )
}