import {useEffect, useState} from "react";
import {Button, Form, type FormInstance} from "antd";


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
            <Button
                type="primary"
                disabled={!submittable}
                style={style}
                htmlType='submit'
                icon={icon}
            >
                {children }
            </Button>
    )
}
