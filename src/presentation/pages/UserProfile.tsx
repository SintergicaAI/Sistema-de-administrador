// src/presentation/pages/UserProfile.tsx
import React, {useEffect, useState} from 'react';
import {User} from '../../domain/entities/User';
import {UserApi} from '../../infrastructure/api/UserApi';
import {GetUserProfile} from '../../application/use-cases/GetUserProfile';
import {Button, Descriptions} from "antd";
import {EditOutlined} from "@ant-design/icons";


const UserProfile: React.FC<{ userId: string }> = ({userId}) => {
    const [user, setUser] = useState<User | null>(null);
    const userApi = new UserApi();
    const getUserProfile = new GetUserProfile(userApi);

    useEffect(() => {
        getUserProfile.execute(userId).then(setUser);
    }, [userId]);

    return (
        <div>
            {user ? (
                <Descriptions title={<h1>Perfil de Usuario</h1>} size={"middle"} bordered
                              extra={<Button type={"primary"} icon={<EditOutlined/>}>Editar</Button>}>
                    <Descriptions.Item label="Id" span={1}>{user.id}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={1}>{user.email}</Descriptions.Item>
                    <Descriptions.Item label="Nombre completo" span={1}>{user.fullName}</Descriptions.Item>
                    <Descriptions.Item label="Rol" span={1}>{user.role}</Descriptions.Item>
                </Descriptions>
            ) : (
                <p>Cargando...
                </p>
            )}
        </div>
    );
};

export default UserProfile;