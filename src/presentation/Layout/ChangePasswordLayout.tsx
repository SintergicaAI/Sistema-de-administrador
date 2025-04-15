import {Col, Row} from "antd";
import {authLayoutStyle} from "./styles/authLayoutStyle.ts";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
}

export const ChangePasswordLayout = ({children}:Props) => {
    return (
        <Row style={authLayoutStyle}
             justify="center"
             align="middle"
        >
            <Col span={12} >
                {children}
            </Col>
        </Row>
    )
}