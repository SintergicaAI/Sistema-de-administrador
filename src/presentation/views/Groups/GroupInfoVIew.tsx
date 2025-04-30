import {useParams} from "react-router";
import {Layout} from "antd";
import {Typography} from "antd";
import {ElementContainer} from "../../components/Groups/ElementContainer.tsx";
import {CSSProperties} from "react";
import {LibraryBig, Users} from 'lucide-react';
import './styles/GroupInfoView.css';
import {SiderGroup} from "../../components/Groups/SiderGroup.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";
import {ContainerChildConocimiento} from "../../components/Groups/ContainerChildConocimiento.tsx";
import {ContainerChildAsistentes} from "../../components/Groups/ContainerChildAsistentes.tsx";
import {ContainerChildMiembros} from "../../components/Groups/ContainerChildMiembros.tsx";

const {Content} = Layout;
const {Title} = Typography;

const styleIcon:CSSProperties = {
    width:20,
    height:20,
}

export const GroupInfoVIew = ()=>{
    let {nameGroup} = useParams();
    const {hasSelected} = useGroupContext();

    return (<Layout style={{display:"flex"}}>
        <Content className='container-content' style={{display:'flex', flexDirection:'column', gap:24}}>
            <section className="section">
                <p className='section__label'>Nombre</p>
                <Title level={2} style={{marginBlock:0, fontSize:20}}>{nameGroup} </Title>
            </section>
            <section className='section'>
                <ElementContainer
                    id={'conocimiento'}
                    labelText={'Base de conocimientos'}
                    buttonText={'Administrar bases'}
                    iconButton={<LibraryBig style={styleIcon}/>}
                    containerChild =
                        {<ContainerChildConocimiento/>}
                ></ElementContainer>
            </section>
            <section className='section'>
                <ElementContainer
                    id='asistentes'
                    labelText={'Asistentes'}
                    buttonText={'Administrar asistentes'}
                    iconButton={<img
                        src='/src/assets/sintergica-logo.svg'
                        alt='logo de la empresa'
                        style={{display:'block'}}
                        width='20' height='20'/>}
                    containerChild =
                        {<ContainerChildAsistentes/>}
                ></ElementContainer>
            </section>
            <section className='section'>
                <ElementContainer
                    id={'usuarios'}
                    labelText={'Miembros del grupo'}
                    buttonText={'Administrar miembros'}
                    iconButton={<Users style={styleIcon}/>}
                    containerChild =
                        {<ContainerChildMiembros/>}
                ></ElementContainer>
            </section>
        </Content>
        {hasSelected && <SiderGroup/>}
    </Layout>);
}