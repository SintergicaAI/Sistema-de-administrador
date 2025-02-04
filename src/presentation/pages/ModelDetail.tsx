import {useParams} from "react-router";
import {Card, Descriptions, Layout, Switch, Typography} from "antd";
import {useEffect, useState} from "react";
import {Model} from "../../domain/entities/Model.ts";
import {ModelApi} from "../../infrastructure/api/ModelApi.ts";
import {GetModelDetails} from "../../application/use-cases/GetModelDetails.ts";

const {Header, Content} = Layout;
const {Title} = Typography;

export function ModelDetail() {
    const {id} = useParams();
    const [model, setModel] = useState<Model | null>(null);

    useEffect(() => {
        const modelApi = new ModelApi();
        const getModelById = new GetModelDetails(modelApi);
        if (id != null) {
            getModelById.execute(id).then(setModel);
        } else {
            setModel(null);
        }
    }, [id])

    return (
        <Layout>
            <Header>
                <Title level={2} style={{margin: 0, padding: "16px"}}>
                    Model Details
                </Title>
            </Header>
            <Content style={{margin: "24px 16px", padding: 24}}>
                <Card>
                    <Descriptions title={`Details for Model ${id}`}>
                        <Descriptions.Item label="Model ID">{id}</Descriptions.Item>
                        <Descriptions.Item label="Description">{model?.description}</Descriptions.Item>
                        <Descriptions.Item label="Author">{model?.author?.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Status">
                            <Switch checked={model?.isActive} size={"small"} disabled/>
                        </Descriptions.Item>
                    </Descriptions>
                </Card>
            </Content>
        </Layout>
    );
}