import {Col,Row} from "antd";
import {Outlet} from "react-router-dom";
import "../pages/styles/login.css";

export const AuthLayout = () =>{
    return (
        <Row justify="center" align="middle" style={{
            minHeight: "100vh"
        }}>
            <Col >
                <Outlet/>
            </Col>
        </Row>
    );
}