import {Table, TableProps, Flex, GetProp} from "antd";
import {Avatar} from "../common/Avatar.tsx";
import {CSSProperties, useEffect, useState} from "react";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {TableOperation} from "../../../infrastructure/api/TableOperation.ts";
import {DataType} from "./types/TableAdministrationTypes.ts"
import { SlidersHorizontal } from 'lucide-react';
import {useContext} from "react";
import {AdministrationContext,valueAdministrationContext} from "../../context/Administration";

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

const tableStyle:React.CSSProperties = {
    width: '90%',
    minWidth:'450px',
    maxWidth: '900px',
    marginInline: 'auto',
}
const iconTableConfiguration:CSSProperties = {
    width: "20px",
    height: '20px',
}

const RenderGroups = ({groups}:{groups:string[]})=>{
    const sizeGroup = groups.length;
    const texto = sizeGroup >1? 'grupos': 'grupo ';
    return (<Flex align="center" gap={12}>
                <p>{sizeGroup} {texto }</p>
                <SlidersHorizontal style={iconTableConfiguration}/>
            </Flex>
    )
}

interface RecordType {
    key:string;
}

interface TableParams {
    pagination?: TablePaginationConfig;
}

const operationTable = new TableOperation();
const getAllUser = new GetAllUserCompanyData(operationTable);

export const TableAdministration = () =>{

    const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])

    const {changeSelectedRow,
        changeHasSelected,
        setDataTabla,
        searchText}:valueAdministrationContext = useContext(AdministrationContext);

    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);

    const PAGE_SIZE = 5;
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
           pageSize: PAGE_SIZE
        },
    });

    const prepareData = ()=>{
        setLoading(true);
        const page = tableParams.pagination?.current ?? 1;
        console.log(page);

        getAllUser.execute(page,PAGE_SIZE).then(result =>{
            const [data,next] = result
            console.log('currentPage ', page)
            console.log('Data ', data);
            setData(data);
            setLoading(false);
            setDataTabla(data as []);

            setTableParams({
                ...tableParams,
                pagination:{
                    ...tableParams.pagination,
                }
            })
        })
    }

    useEffect(() => {
        prepareData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
    ]);
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
        getCheckboxProps:(record) =>({
            disabled:true,
            style:{display: 'none'},
        })
    }



    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
       setTableParams({pagination})

    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title:'Usuario',
            dataIndex: 'name',
            key: 'name',
            filteredValue:[searchText],
            onFilter:(value, record) => {
                return record.name
                    .toString()
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
                pagination={{...tableParams.pagination,
                    onChange:(page) =>{
                            setTableParams({
                                ...tableParams,
                                pagination:{
                                    ...tableParams.pagination,
                                    current:page
                                }
                            })
                        }
                }}
            />
        </>
    )
}