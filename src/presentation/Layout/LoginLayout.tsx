import {Col, Row} from "antd";
import {ContainerImages} from "./components/ContainerImages.tsx";
import {TuringTitle} from "./components/TuringTitle.tsx";
import {ReactNode} from "react";

type Props = {
    children: ReactNode;
}

export const LoginLayout = ({children}:Props) => {
    return (
            <Row style={{
                backgroundColor: "var(--c_slate_200)",
                padding: "0.5rem",
                minHeight: "100vh",
            }}>
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