import {useEffect, useState} from "react";
import {Button, ConfigProvider, Form, type FormInstance} from "antd";


export interface SubmitButtonProps {
    form: FormInstance;
    style?: React.CSSProperties;
    icon?: React.ReactNode;
}

export const SubmitButton:React.FC<React.PropsWithChildren<SubmitButtonProps>> =
    ({form,children,style,icon}) => {
    const [submittable, setSubmittable] = useState<boolean>(false);

    const values = Form.useWatch([],form);

    useEffect(() => {
        form
            .validateFields({validateOnly:true})
            .then(()=> setSubmittable(true))
            .catch(()=> setSubmittable(false))

    }, [form,values]);

    return (
        <ConfigProvider theme={{
            components:{
                Button: {
                    colorBgContainerDisabled:'hsla(210, 93%, 58%, 0.5)'
                },
            }
        }}>
            <Button
                type="primary"
                disabled={!submittable}
                style={style}
                htmlType='submit'
                icon={icon}
            >
                {children }
            </Button>

        </ConfigProvider>)
}
