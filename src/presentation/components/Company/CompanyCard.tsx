import './style/CompanyCard.css';
import { Tooltip } from "antd";
import { Link } from "react-router";

interface CompanyCardData {
    rfc: string;
    name: string;
    address: string;
}

export const CompanyCard = ({ name, rfc, address }: CompanyCardData) => {
    return (
        <Link to={`/company/${name}`}>
            <div className='company-card'>
                <div className='company-card__header'>
                    <Tooltip title={name}>
                        <p className='company__name f-size-16'>{name}</p>
                    </Tooltip>
                </div>
                <div className='company-card__info'>
                    <p className='company-card__rfc'>RFC: {rfc}</p>
                    <p className='company-card__address'>{address}</p>
                </div>
            </div>
        </Link>
    );
};