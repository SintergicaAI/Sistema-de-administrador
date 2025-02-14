import {Table, TableProps, TablePaginationConfig} from "antd";
//import { SearchOutlined } from '@ant-design/icons';
//import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import {Avatar} from "../common/Avatar.tsx";
import type {AdministrationApiResponse} from "../../../infrastructure/api/types/TableApiResponse.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {TableOperation} from "../../../infrastructure/api/TableOperation.ts";
//import type { FilterDropdownProps } from 'antd/es/table/interface';

interface DataType extends AdministrationApiResponse {
    key:string;
}

const RenderGroups = ({groups}:{groups:string[]})=>{
    const sizeGroup = groups.length;
    const texto = sizeGroup >1? 'grupos': 'grupo';
    return (<p>{sizeGroup} {texto }</p>)
}

const columns: TableProps<DataType>['columns'] = [
    {
        title:'Usuario',
        dataIndex: 'first_name',
        key: 'first_name',
        render: (name)=>(<Avatar name={name} style={{}} />)
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

const tableStyle:React.CSSProperties = {
    width: '90%',
    minWidth:'450px',
    maxWidth: '900px',
    marginInline: 'auto',
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
            pageSize: 3,
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

    const selectRow = (record:RecordType) => {
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
    }

    const rowSelection:TableProps<DataType>['rowSelection'] ={
        selectedRowKeys,
        preserveSelectedRowKeys:true,
        onChange: (selectedRowKeys: React.Key[]) => {
            setSelectedRowKeys(selectedRowKeys as string[]);
        }
    }

    return (
        <>
            <Table<DataType>
                dataSource={data}
                columns={columns}
                style={tableStyle}
                rowSelection={{...rowSelection,hideSelectAll:true}}
                /*onRow={(record:RecordType)=>({
                    onClick: () => {
                        selectRow(record);
                    }
                })}*//>
        </>
    )
}