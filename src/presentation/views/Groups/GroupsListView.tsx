import {Button, Layout} from "antd";
import {SquarePlus} from "lucide-react";
import {InputSearch} from "../../components/common";
import {GroupsList} from "../../components/Groups/GroupsList.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

const {Header, Content} = Layout;

export const GroupsListView = () => {

    const {totalGroups} = useGroupContext()

    return (<Layout className='container-content' style={{display:'flex', flexDirection:'column'}}>
        <Header
            style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'}}
        >
            {/*TODO:Agregar funcionalidad*/}
            <Button type="primary"
                    icon={<SquarePlus style={{width:20, height:20}}/>}>
                Nuevo grupo
            </Button>

            <div style={{display: 'flex',gap:8}}>
                <p style={{marginBlock:0}}>{totalGroups} {`${totalGroups !=1 ? 'grupos': 'grupo'}`}</p>
                <div style={{minWidth:250}}>
                    <InputSearch placeholder={"Buscar grupos"} searchMethod={()=>{}}/>
                </div>
            </div>
        </Header>
        <Content style={{flexGrow:1, marginTop:24}}>
              <GroupsList/>
        </Content>
    </Layout>)
}