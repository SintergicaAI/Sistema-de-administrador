import {Typography} from "antd";
import "./CompanyLabel.css";

const {Title} = Typography;
export const CompanyLabel = ()=>{
    return (< >
        <Title level={2} style={{marginTop:20,marginBottom:50 ,fontSize:20}}>Términemos tú cuenta antes de continuar</Title>
        <div className="company-label">
            <p className="company-label__text">Has sido invitado al siguiente equipo</p>
            <div className="company">
                <div className="company__img-container">
                    <img src="/src/assets/avatar.png" alt="logo de la compañia" className="company__logo" width="32" height="32"/>
                    <span className="company__name">Shell</span>
                </div>
                <p className="company__members">24 miembros</p>
            </div>
        </div>
    </>)
}