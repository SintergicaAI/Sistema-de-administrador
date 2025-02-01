// src/presentation/pages/UserProfile.tsx
import React, { useEffect, useState } from 'react';
import { User } from '../../domain/entities/User';
import { UserApi } from '../../infrastructure/api/UserApi';
import { GetUserProfile } from '../../application/use-cases/GetUserProfile';
import {Descriptions} from "antd";

const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const [user, setUser] = useState<User | null>(null);
  const userApi = new UserApi();
  const getUserProfile = new GetUserProfile(userApi);

  useEffect(() => {
    getUserProfile.execute(userId).then(setUser);
  }, [userId]);

  return (
    <div>
      <h1>Perfil de usuario</h1>
      {user ? (
        <div>
          <Descriptions title={"User info"} >
            <Descriptions.Item label="Nombre">{user.name}</Descriptions.Item>
            <Descriptions.Item label="Apellido">{user.lastName}</Descriptions.Item>
            <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
            <Descriptions.Item label="Rol">{user.role}</Descriptions.Item>
            <Descriptions.Item label="Nombre completo">{user.fullName}</Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <p>Cargando...
        </p>
      )}
    </div>
  );
};

export default UserProfile;