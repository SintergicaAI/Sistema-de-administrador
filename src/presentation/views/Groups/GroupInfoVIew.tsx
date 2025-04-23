import {useParams} from "react-router";
import {Layout} from "antd";
import {Typography} from "antd";
import {ElementContainer} from "../../components/Groups/ElementContainer.tsx";
import {CSSProperties} from "react";
import {LibraryBig, Users} from 'lucide-react';
import './styles/GroupInfoView.css';
import {SiderGroup} from "../../components/Groups/SiderGroup.tsx";
import {useGroupContext} from "../../context/Group/useGroupContext.ts";

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
                    labelText={'Base de conocimientos'}
                    buttonText={'Administrar bases'}
                    iconButton={<LibraryBig style={styleIcon}/>}
                    containerText=
                        {<p>Sin bases de conocimiento asociadas, da click en <span className='highlight-text'>Añadir  bases de conocimiento</span> , vincularlas</p>}
                ></ElementContainer>
            </section>
            <section className='section'>
                <ElementContainer
                    labelText={'Asistentes'}
                    buttonText={'Administrar asistentes'}
                    iconButton={<img
                        src='/src/assets/sintergica-logo.svg'
                        alt='logo de la empresa'
                        style={{display:'block'}}
                        width='20' height='20'/>}
                    containerText=
                        {<p>No hay modelos asociados, da click en <span className='highlight-text'>Administrar modelos</span>, para cambiar agregar modelos</p>}
                ></ElementContainer>
            </section>
            <section className='section'>
                <ElementContainer
                    labelText={'Miembros del grupo'}
                    buttonText={'Administrar miembros'}
                    iconButton={<Users style={styleIcon}/>}
                    containerText=
                        {<p>No hay modelos asociados, da click en <span className='highlight-text'>Administrar miembros</span>, para cambiar agregar miembros</p>}
                ></ElementContainer>
            </section>
        </Content>
        {hasSelected && <SiderGroup/>}
    </Layout>);
}