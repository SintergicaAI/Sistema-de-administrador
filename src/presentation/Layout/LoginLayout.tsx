import {Col, Row} from "antd";
import {ContainerImages} from "./components/ContainerImages.tsx";
import {TuringTitle} from "./components/TuringTitle.tsx";
import {ReactNode} from "react";
import {authLayoutStyle} from "./styles/authLayoutStyle.ts";

type Props = {
    children: ReactNode;
}

export const LoginLayout = ({children}:Props) => {
    return (
            <Row style={authLayoutStyle}>
                <Col xs={24} lg={8}

                >
                    <TuringTitle position={"center"}/>
                    {children}
                </Col>
                <Col xs={24} lg={16} >
                    <ContainerImages/>
                </Col>
            </Row>
    );
}