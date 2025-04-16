import {Col, Row} from "antd";
import {authLayoutStyle} from "./styles/authLayoutStyle.ts";
import {ReactNode} from "react";
import {TuringTitle} from "./components/TuringTitle.tsx";

type Props = {
    children: ReactNode;
}

export const ChangePasswordLayout = ({children}:Props) => {
    return (<div style={{...authLayoutStyle,
            display:'flex',
            flexDirection:'column'}}>
            <TuringTitle position={"left"}/>
            <Row
                 justify="center"
                 align="middle"
                 style={{flexGrow:1}}
            >
                <Col span={12} >
                    {children}
                </Col>
            </Row>
        </div>
    )
}