import { Row,Col } from "antd"
import {ReactNode} from "react";
import {ContainerImages} from "./ContainerImages.tsx";
import {TuringTitle} from "./TuringTitle.tsx";

type Props = {
    children: ReactNode;
}

export const RegisterLayout = ({children}:Props) => {
    return (
        <Row style={{minHeight:'100vh'}}>
            <Col span={10}>
                <TuringTitle />
                {children}
            </Col>
            <Col span={14}>
                <ContainerImages />
            </Col>
        </Row>
    )
}