import {Avatar, Card, List, Skeleton, Switch} from "antd";
import {useEffect, useState} from "react";
import {Model} from "../../domain/entities/Model.ts";
import {ModelApi} from "../../infrastructure/api/ModelApi.ts";
import {GetAllModels} from "../../application/use-cases/GetAllModels.ts";
import Search from "antd/es/input/Search";
import {SearchProps} from "antd/lib/input";

const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

export default function ModelOverview() {
    const [models, setModels] = useState<Model[] | []>([]);
    const modelApi = new ModelApi();
    const getAllModels = new GetAllModels(modelApi);

    useEffect(() => {
        getAllModels.execute().then(setModels);
    }, [])
    return <div>
        <h1>Modelos | <small>{models.length}</small></h1>
        <Search placeholder="Buscar modelos" onSearch={onSearch} enterButton />

        {models ?
            (
                <List grid={{gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3}}
                      dataSource={models}
                      renderItem={item => (
                          <List.Item>
                              <Card title={item.name} bordered={true}>
                                  <Avatar src={item.image} shape="circle" size={50} />
                                  <p>{item.description}</p>
                                  <Switch defaultChecked={item.isActive}/>
                              </Card>
                          </List.Item>
                      )}
                />
            ) :
            (
                <Skeleton active />
            )
        }
    </div>
}