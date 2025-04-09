import {Col, Row} from "antd";
import {ContainerImages} from "./ContainerImages.tsx";
import {TuringTitle} from "./TuringTitle.tsx";
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
                <Col span={8}

                >
                    <TuringTitle position={"center"}/>
                    {children}
                </Col>
                <Col span={16} >
                    <ContainerImages/>
                </Col>
            </Row>
    );
}