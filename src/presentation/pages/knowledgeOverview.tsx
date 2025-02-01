import {Card, Col, Row} from "antd";

export function KnowledgeOverview() {
    return <div>
        <Row gutter={16}>
            <Col span={8}>
                <Card title="Model 1" bordered={false}>
                    <p>Model 1</p>
                </Card>
            </Col>
            <Col span={8}>
                <Card title="Model 2" bordered={false}>
                    <p>Model 2</p>
                </Card>
            </Col>
        </Row>
    </div>
}