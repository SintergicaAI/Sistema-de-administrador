import {Table, TableProps, Flex} from "antd";
import {Avatar} from "../common";
import {useEffect, useState} from "react";
import {GetAllUserCompanyData} from "../../../application/use-cases/GetAllUserCompanyData.ts";
import {DataType} from "./types/TableAdministrationTypes.ts"
import {useContext} from "react";
import {AdministrationContext,valueAdministrationContext} from "../../context/Administration";
import {RenderGroups, tableStyle} from "./TableConfiguration.tsx";
//import {UserDTO} from "../../../infrastructure/api/types/CompanyResponse.ts";
import {v4 as uuid} from "uuid";
//import {CompanyApi} from "../../../infrastructure/api/CompanyApi.ts";
import {UserSearchParams} from "../../../domain/repositories/CompanyRepository.ts";
import {LocalOperation} from "../../../infrastructure/api/LocalOperation.ts";
import {User} from "../../../domain/entities/User.ts";


interface RecordType {
    key:string;
}

/*const operationTable = new TableOperation();*/
const operationTable = new LocalOperation();
const getAllUser = new GetAllUserCompanyData(operationTable);

const formatDataTable = (data: []):DataType[] => {

    return [...data.map(
        (user:User) =>
            (
                //
                {...user,
                    fullName:`${user.fullName}`,
                    key: uuid() as string,
                 /*   groups: [...user.groupsDTO.map(group => group.name.split(" ")[0])]*/

                }
            )
    )]
}

export const TableAdministration = () =>{

    const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])

    const {changeSelectedRow,
        changeHasSelected,
        setTotalItemsTable,
        totalItemsTable,
        searchText,
        dataTable,
        setDataTabla}:valueAdministrationContext = useContext(AdministrationContext);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dataInmutable,setDataInmutable] = useState<User[]>([]) //Guarda los datos de la tabla original
    const PAGE_SIZE = 5;



    const prepareData = ()=>{
        setLoading(true);

        const searchParams: UserSearchParams = {
            page:currentPage,
            limit:5,
            query:""
        }

        getAllUser.execute(searchParams).then(result =>{
            const {users,total} = result
            //console.log(users, total);
            setDataInmutable(users);
            setDataTabla( (formatDataTable(users as[])) );
            setLoading(false);
            setTotalItemsTable(total);
        })
    }

    //Trabajar el filtrado utilizando el endpoint search.
    const filterDataByName = () =>{
        //console.log('Entramos al filtrado de datos');
        const filterData = dataInmutable.filter((data)=>{
            if(data.fullName.toLowerCase().includes(searchText.toLowerCase())){
                return data;
            }
        })

        //console.log(filterData);
        if(filterData.length > 0){
            setDataTabla((formatDataTable(filterData as[])));
        }  else{
            setDataTabla((formatDataTable(dataInmutable as[])));
        }

        setCurrentPage(1);
    }


    useEffect(() => {
        prepareData();
    }, [currentPage]);

    useEffect(() => {
        filterDataByName();
    }, [searchText]);

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
                loading={loading}
                pagination={{
                    pageSize:PAGE_SIZE,
                    total:totalItemsTable,
                    onChange:(page) =>{
                        setCurrentPage(page)
                    },
                    position:['bottomCenter']
                }}
            />
        </>
    )
}