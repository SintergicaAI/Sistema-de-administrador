import {Button, Layout} from "antd";
import {SquarePlus} from "lucide-react";
import {InputSearch} from "../../components/common";
import {NotFoundGroups} from "../../components/Groups/NotFoundGroups.tsx";

const {Header, Content} = Layout;

export const GroupsListView = () => {
    return (<Layout style={{display:'flex', flexDirection:'column'}}>
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

            <div style={{minWidth:250}}>
                <InputSearch placeholder={"Buscar grupos"} searchMethod={()=>{}}/>
            </div>
        </Header>
        <Content style={{flexGrow:1, paddingBlock:40 }}>
            <div style={{display:'grid', placeContent:'center'}}>
                <NotFoundGroups/>
            </div>
        </Content>
    </Layout>)
}