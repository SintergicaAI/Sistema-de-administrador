import {Button, Layout} from "antd";
import {SquarePlus} from "lucide-react";
import {GroupsList} from "../../components/Groups/GroupsList.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {InputSearchGroups} from "../../components/Groups/InputSearchGroups.tsx";
import { useNavigate } from "react-router";

const {Header, Content} = Layout;

export const GroupsListView = () => {

    const {totalGroups,setActualGroupName} = useGroupContext()
    const navigate = useNavigate();


    return (<Layout className='container-content' style={{display:'flex', flexDirection:'column'}}>
        <Header
            style={{display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'}}
        >
            <Button type="primary"
                    onClick={()=>{
                        navigate('nuevo-grupo')
                        setActualGroupName("Nuevo grupo");
                    }}
                    icon={<SquarePlus style={{width:20, height:20}}/>}>
                Nuevo grupo
            </Button>

            <div style={{display: 'flex',gap:8}}>
                <p style={{marginBlock:0}}>{totalGroups} {`${totalGroups !=1 ? 'grupos': 'grupo'}`}</p>
                <div style={{minWidth:250}}>
                   <InputSearchGroups/>
                </div>
            </div>
        </Header>
        <Content style={{flexGrow:1, marginTop:24}}>
              <GroupsList/>
        </Content>
    </Layout>)
}