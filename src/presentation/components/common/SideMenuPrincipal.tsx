
import {Avatar, Flex,message} from "antd";
import {MenuPrincipal} from "./MenuPrincipal.tsx";
import {Layout} from "antd";
import {AuthApi} from "../../../infrastructure/api/AuthApi.ts";
import {LogOut} from "../../../application/use-cases/LogOut.ts";
import {useNavigate} from "react-router";
import {LogOut as IconLogOut} from 'lucide-react';
import './styles/SideMenuPrincipal.css';

const siderStyle: React.CSSProperties = {
    overflowX: 'hidden',
    height: '100vh',
    position: 'sticky',
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: 'thin',
    scrollbarGutter: 'stable',
    padding:'var(--sm-space)',
};


//todo:Cambiar URL a una consulta a la API
const url = "/src/assets/avatar.png";

const space_between_elements = 10;

const {Sider} = Layout;
export const SideMenuPrincipal = () =>{

    const navigate = useNavigate();

    const handleLogOut = () => {
        const api = new AuthApi()
        const logout = new LogOut(api)

        logout.execute().then(() => {
            message.open({
                type: 'loading',
                content: 'Cerrando sesión',
                duration: 3,
            }).then(()=> navigate("/auth"))
        }).catch(error => {
            message.open({
                type: 'error',
                content: 'No se pudo cerrar sesión. Error: ' + error.message,
                duration: 3,
            })
        })
    }
    //const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider  collapsed={true} style={siderStyle}>
            <Flex vertical={true} justify="space-between" gap={space_between_elements} style={{minHeight:'100%'}} >
                <Flex justify="center" align="center" vertical={true}>
                    {
                        //todo: Implementar logica (caso de uso) para la hacer una peticion del logo de la empresa
                    }
                    <Avatar src={<img src={url} alt={"user avatar"}/>} size={"large"}></Avatar>
                </Flex>
                <MenuPrincipal />
                <Flex justify="center" align='center' vertical={true}  gap={space_between_elements}>

                    <button onClick={handleLogOut} className='button-logout'>
                        <IconLogOut className='icon-hover-logout' style={{width:'24px',height:'24px'}}/>
                    </button>
                    <a href="https://sintergica.ai/">
                        <img src="/src/assets/brand.svg" alt="" width="48" height="48"/>
                    </a>

                </Flex>
            </Flex>

    </Sider>
    );
}