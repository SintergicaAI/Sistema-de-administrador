import {Row, Col, Typography} from "antd"
import {ReactNode} from "react";
import {ContainerImages} from "./components/ContainerImages.tsx";
import {TuringTitle} from "./components/TuringTitle.tsx";
import {useSearchParams} from "react-router";
import {CompanyLabel} from "./components/CompanyLabel.tsx";

type Props = {
    children: ReactNode;
}
const {Title} = Typography;


export const RegisterLayout = ({children}:Props) => {
    let [searchParams] = useSearchParams();

    return (
        <Row
            style={{
                backgroundColor: "var(--c_slate_200)",
                padding: "0.5rem",
                minHeight: "100vh",
                fontSize:14,
            }}
        >
            <Col xs={24} lg={10}>
                <div className="form__container register-form">
                    <TuringTitle position="left"/>
                    {searchParams.get('signInToken') ? <CompanyLabel/>
                        :<Title level={2} style={{marginTop:20,marginBottom:50 ,fontSize:20}}>Registra tu cuenta</Title>
                    }
                    {children}
                </div>
            </Col>
            <Col xs={24} lg={14}>
                <ContainerImages />
            </Col>
        </Row>
    )
}