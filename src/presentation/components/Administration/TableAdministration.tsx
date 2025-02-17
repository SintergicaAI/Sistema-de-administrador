import {Table, TableProps} from "antd";
import {Avatar} from "../common/Avatar.tsx";
import type {AdministrationApiResponse} from "../../../infrastructure/api/types/TableApiResponse.ts";
import {useState} from "react";

interface DataType extends AdministrationApiResponse {
    key:string;
}


//TODO: Generar la logica para que la informacion se consiga de un endpoint
const data:DataType[] = [
    {
        key:'1',
        fullName:'Gonzalo',
        rol:'administrador',
        email:'gonzalo@gmail.com',
        groups:5
    },
    {
        key:'2',
        fullName:'Pedro',
        rol:'usuario',
        email:'gonzalo@gmail.com',
        groups:5
    },
    {
        key:'3',
        fullName:'Juan',
        rol:'usuario',
        email:'gonzalo@gmail.com',
        groups:5
    }
]

const columns: TableProps<DataType>['columns'] = [
    {
        title:'Usuario',
        dataIndex: 'fullName',
        key: 'fullName',
        render: (name)=>(<Avatar name={name}/>)
    },
    {
        title:'Rol',
        key:'rol',
        dataIndex: 'rol',
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



export const TableAdministration = ({setSelectedRow}:
                                    { setSelectedRow:()=>{}}) =>{

    const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])

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
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
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
                onRow={(record:RecordType)=>({
                    onClick: () => {
                        selectRow(record);
                    }
                })}/>
        </>
    )
}