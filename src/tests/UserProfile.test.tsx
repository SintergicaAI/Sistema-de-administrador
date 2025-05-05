import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, expect, it, vi } from 'vitest'
import UserProfile from '../presentation/pages/UserProfile'
import { GetUserProfile } from '../application/use-cases/GetUserProfile.ts'
import { User } from '../domain/entities/User.ts'
// import { UserApi } from '../infrastructure/api/UserApi.ts'

//Mock de GetUserProfile y UserApi
vi.mock('../application/use-cases/GetUserProfile')
// vi.mock('../infrastructure/api/UserApi')

const mockUser: User = {
    id: '123',
    email: 'test@example.com',
    fullName: 'Test User',
    role: 'admin',
    isAdmin: true
}

let getUserProfileMock: { execute: (userId: string) => Promise<User> }


beforeEach(() => {
    //Se simula que "execute" devuelve un usario valido
    getUserProfileMock = {
        execute: vi.fn().mockResolvedValue(mockUser)
    }
    //Se reemplaza la implementación real de la clase GetUserProfile
    GetUserProfile.prototype.execute = getUserProfileMock.execute

    render(
        <UserProfile userId='123' />
    )
})


it('should show "Cargando..." before receiving data', () => {
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
})

it('should call getUserProfile.execute with the correct userId', async () => {
    await waitFor(() => {
        expect(getUserProfileMock.execute).toHaveBeenCalledWith('123')
    })
})

it('should render the user data when the API responds', async () => {
    await waitFor(() => {
        expect(screen.getByText('Perfil de Usuario')).toBeInTheDocument()
        expect(screen.getByText('Id')).toBeInTheDocument()
        expect(screen.getByText('123')).toBeInTheDocument()
        expect(screen.getByText('Email')).toBeInTheDocument()
        expect(screen.getByText('Nombre completo')).toBeInTheDocument()
        expect(screen.getByText('Rol')).toBeInTheDocument()
    })
})

it('should show the "Editar" button', async () => {
    await waitFor(() => {
        expect(screen.getByText('Editar')).toBeInTheDocument()
    })
})
