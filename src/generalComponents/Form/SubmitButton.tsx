import {useEffect, useState} from "react";
import {Button, Form, type FormInstance,Flex} from "antd";


export interface SubmitButtonProps {
    form: FormInstance;
}

export const SubmitButton:React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({form,children}) => {
    const [submittable, setSubmittable] = useState<boolean>(false);

    const values = Form.useWatch([],form);

    useEffect(() => {
        form
            .validateFields({validateOnly:true})
            .then(()=> setSubmittable(true))
            .catch(()=> setSubmittable(false))

    }, [form,values]);

    return (
        <Flex justify="center">
            <Button type="primary" disabled={!submittable} style={{width:'120px'}} htmlType='submit' >
                {children }
            </Button>
        </Flex>
    )
}
