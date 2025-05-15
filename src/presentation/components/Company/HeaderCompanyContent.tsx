import { Flex, Typography } from "antd";
import { useNavigate, useParams } from "react-router";
import { upperCaseOneWord } from "../../utilities";
const { Title } = Typography;
import { Trash2, Undo2 } from 'lucide-react';
import { CSSProperties } from "react";

const iconStyle: CSSProperties = {
    width: 20,
    height: 20,
    cursor: "pointer",
}

export const HeaderCompanyContent = () => {
    let { companyName } = useParams();
    const navigate = useNavigate();

    return (
        <Flex style={{ height: '100%' }} justify={'space-between'} align={'center'}>
            <Flex style={{ lineHeight: 1 }} align={'center'} gap={16}>
                {companyName &&
                    <Undo2
                        onClick={() => { navigate(-1) }}
                        style={iconStyle}
                    />
                }

                <Title style={{
                    fontWeight: 'bold',
                    color: `${companyName ? '#94A3B8' : 'initial'}`,
                    marginBlock: 0
                }}>
                    Compañías
                </Title>
                {
                    companyName && (
                        <p className="company__tag">{upperCaseOneWord(companyName)}</p>
                    )
                }
            </Flex>

            <Trash2 color='var(--c_danger_400)' style={iconStyle} />
        </Flex>
    );
};