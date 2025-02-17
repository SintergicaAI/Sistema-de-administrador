import {Table, TableProps, TablePaginationConfig,Flex} from "antd";
import {Avatar} from "../common/Avatar.tsx";
import {CSSProperties, Dispatch, SetStateAction, useEffect, useState} from "react";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {TableOperation} from "../../../infrastructure/api/TableOperation.ts";
import {GetColumnSearchProps} from "./GetColumnSearchProps.tsx";
import {DataType} from "./types/TableAdministrationTypes.ts"
import { SlidersHorizontal } from 'lucide-react';

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
    const texto = sizeGroup >1? 'grupos': 'grupo';
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

export const TableAdministration = ({setSelectedRow}:
                                    { setSelectedRow:Dispatch<SetStateAction<any>>}) =>{

    const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])

    const [data, setData] = useState<DataType[]>();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState<TableParams>({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const prepareData = ()=>{
        setLoading(true);
        getAllUser.execute().then( data =>{
            setData(data);
            setLoading(false);

        })
    }

    useEffect(() => {
        prepareData();
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
    ]);


    /*const selectRow = (record:RecordType) => {
        const newSelectedRowKeys = [...selectedRowKeys];
        const recordIndex = newSelectedRowKeys.indexOf(record.key);

        if (recordIndex >= 0) {
            // Si ya está seleccionado, lo eliminamos de la lista.
            newSelectedRowKeys.splice(recordIndex, 1);
        } else {
            // Si no está seleccionado, lo agregamos a la lista.
            newSelectedRowKeys.push(record.key);
        }
        setSelectedRow(record);
        setSelectedRowKeys(newSelectedRowKeys);
    }*/
    const changeRow = (selectedRow:RecordType) => {
        setSelectedRow(selectedRow);
    }

    const rowSelection:TableProps<DataType>['rowSelection'] ={
        selectedRowKeys,
        type:"radio",
        preserveSelectedRowKeys:true,
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
                setSelectedRowKeys(selectedRowKeys as string[]);
                const [selectedRow] =  selectedRows;
                setSelectedRow(selectedRow);
                //console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    }



    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const columns: TableProps<DataType>['columns'] = [
        {
            title:'Usuario',
            dataIndex: 'name',
            key: 'name',
            ...GetColumnSearchProps("name"),
            render: (name)=>(<Avatar name={name} style={{}} />),
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
                rowSelection={{...rowSelection,hideSelectAll:true,selections:false}}
                onRow={(record, index)=>({
                    onClick: (event) => {

                        document.querySelector(".ant-table-row-selected")?.classList.remove("ant-table-row-selected");
                        let target:HTMLTableElement = event.target as HTMLTableElement;
                        target.closest('tr')?.classList.toggle('ant-table-row-selected');
                        changeRow(record);
                        /*Agregar clase cuando se de click ant-table-row-selected*/
                    },
                })}
                onChange={onChange}
            />
        </>
    )
}