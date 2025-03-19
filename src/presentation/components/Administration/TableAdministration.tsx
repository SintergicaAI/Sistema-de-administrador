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
import {v4 as uuid} from "uuid";
import {User} from "../../../domain/entities/User.ts";


interface RecordType {
    key:string;
}
type groupItem = {
    id: string;
    name: string;
}

const operationTable = new CompanyApi();
const getAllUser = new GetAllUserCompanyData(operationTable);



export const TableAdministration = () =>{

    const [selectedRowKeys,setSelectedRowKeys]=useState<string[]>([])
    const [filterData, setFilterData]=useState<DataType[]>([])

    const {changeSelectedRow,
        changeHasSelected,
        setTotalItemsTable,
        totalItemsTable,
        searchText,
        dataTable,
        changeDataTabla,
        setLoadingTable,
        filters,
        loadingTable}:valueAdministrationContext = useContext(AdministrationContext);

    const [searchParams,setSearchParams]=useState<UserSearchParams>({
        query:"",
        groups:'',
    });

    //UseEffect para preparar los datos
    useEffect(() => {
        console.log("Primer use Effect, se dispara al renderizar el componente");
        prepareData();
    }, []);

    //Si hubo un cambio en las propiedades, que pida otra vez los datos
    useEffect(() => {
       filteringData(searchParams);
    }, [searchParams]);

    useEffect(() => {
        console.log("Hubo cambios en el query")
        setSearchParams({...searchParams, query:searchText});
    }, [searchText]);

    useEffect(() => {
        console.log("Hubo cambios en los filtros.")
        setSearchParams({...searchParams, groups:filters?.toString() || ''});
    }, [filters]);

    const formatData = (data:User[])=>{
        return [...data.map(
            (user:any) =>
                (
                    //
                    {...user,
                        fullName:`${user.fullName}`,
                        key: uuid() as string,
                    }
                )
        )]
    }


    const prepareData = ()=>{
        setLoadingTable(true);
        getAllUser.execute({}).then(result =>{
            const {users,total} = result
            console.log(users);
            changeDataTabla( users);
            setFilterData(formatData(users));
            setLoadingTable(false);
            setTotalItemsTable(total);

        })
    }

    const filteringData = ({page,size,query,groups}:UserSearchParams)=>{
        console.log('Query: ' + searchText + 'Groups:' + filters);
        console.log('Datatable ' + dataTable.length);
        let aux:DataType[] = []

        aux= (query.length > 0 ) ? dataTable.filter((item)=>{
                if(item.fullName.toLowerCase().includes(query.toLowerCase())) return item;
        }) : dataTable;


        aux = (filters.length > 0) ? aux.filter((item)=>{
            if(item.groups?.length){
                const arrayGroups = item.groups.map((item:groupItem)=> item.name.toLowerCase()) ;
                return filters.includes(arrayGroups.toString());
            }
        }) : aux;

        //console.log('Elementos de arreglo auxiliar final' + aux.length)
        console.log(aux);
        setFilterData(aux);
    }

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
                dataSource={filterData}
                columns={columns}
                style={tableStyle}
                rowSelection={{...rowSelection,hideSelectAll:true}}
                onRow={(record)=>({
                    onClick: (event) => {

                        //Cambiar el color del Row cuando se da click
                        document.querySelector(".ant-table-row-selected")?.classList.remove("ant-table-row-selected");
                        let target:HTMLTableElement = event.target as HTMLTableElement;
                        target.closest('tr')?.classList.toggle('ant-table-row-selected');

                        //Cambiar el row seleccionado y renderizar el SiderContent
                        changeRow(record);
                        changeHasSelected(true);
                    },
                })}
                loading={loadingTable}
                pagination={{
                    pageSize:searchParams.size,
                    total:totalItemsTable,
                    showSizeChanger:true,
                    onChange:(page,pageSize) =>{
                        console.log("Metodo de paginacion llamado");
                        setSearchParams({...searchParams, page:page-1,size:pageSize});
                        changeHasSelected(false) //PREGUNTA:cuando cambiamos de pagina, es necesario cerrar el sideBar?
                    },
                    position:['bottomCenter'],
                    pageSizeOptions:[5,10,20,50]
                }}
            />

        </>
    )
}