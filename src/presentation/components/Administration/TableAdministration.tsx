import {Table, TableProps, Flex} from "antd";
import {Avatar} from "../common";
import {useEffect, useState} from "react";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {DataType} from "./types/TableAdministrationTypes.ts"
import {useContext} from "react";
import {AdministrationContext,valueAdministrationContext} from "../../context/Administration";
import {RenderGroups, tableStyle} from "./TableConfiguration.tsx";
import {UserSearchParams} from "../../../domain/repositories/CompanyRepository.ts";
import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";


interface RecordType {
    key:string;
}

const operationTable = new CompanyApi();
const getAllUser = new GetAllUserCompanyData(operationTable);

export const TableAdministration = () =>{

    const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])

    const {changeSelectedRow,
        changeHasSelected,
        setTotalItemsTable,
        totalItemsTable,
        searchText,
        dataTable,
        changeDataTabla,
    setLoadingTable,loadingTable}:valueAdministrationContext = useContext(AdministrationContext);

    const [currentPage, setCurrentPage] = useState(0);
    //const [dataInmutable,setDataInmutable] = useState<User[]>([]) //Guarda los datos de la tabla original
    const PAGE_SIZE = 5;



    const prepareData = ()=>{
        setLoadingTable(true);

        const searchParams: UserSearchParams = {
            page:currentPage,
            size:5,
            query:""
        }

        getAllUser.execute(searchParams).then(result =>{
            const {users,total} = result
            changeDataTabla( users);
            setLoadingTable(false);
            setTotalItemsTable(total);
        })
    }

    useEffect(() => {
        prepareData();
    }, [currentPage]);

    const changeRow = (selectedRow:RecordType) => {
        changeSelectedRow(selectedRow);
        console.log(selectedRow);
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
                dataSource={dataTable}
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
                loading={loadingTable}
                pagination={{
                    pageSize:PAGE_SIZE,
                    total:totalItemsTable,
                    onChange:(page) =>{
                        setCurrentPage(page - 1 )
                    },
                    position:['bottomCenter']
                }}
            />
        </>
    )
}