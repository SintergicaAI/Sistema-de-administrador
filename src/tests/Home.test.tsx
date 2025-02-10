import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { Home } from '../presentation/pages/Home.tsx'
// import { AuthApi } from '../infrastructure/api/AuthApi.ts'
import { LogOut } from '../application/use-cases/LogOut.ts'
import { message } from 'antd'

// Mock de LogOut y AuthApi
vi.mock('../application/use-cases/LogOut', () => ({
    LogOut: vi.fn().mockImplementation(() => ({
        // Simula la promesa resuelta
        execute: vi.fn().mockResolvedValue(true),
    }))
}))

vi.mock('../infrastructure/api/AuthApi')

// Mocks parciales de antd
vi.mock('antd', async (importOriginal) => {
    const actual = (await importOriginal()) as typeof import('antd')
    return {
      ...actual,
      message: { 
        ...actual.message,
        open: vi.fn(),
      },
    };
});

beforeEach(() => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>
    )
})

describe('Home Rendering Test', () => {
    it('should render the Avatar', () => {
        const avatar = screen.getByAltText('github avatar')
        expect(avatar).toBeInTheDocument()
    })

    it('should render the Menu', () => {
        const menu = screen.getByRole('menu')
        expect(menu).toBeInTheDocument()
    })

    it('should redner the Logout button', () => {
        const logoutButton = screen.getByText('Logout')
        expect(logoutButton).toBeInTheDocument()
    })
})

describe('Logout Button Functionality Test', () => {
    it('should call LogOut.execute when logout button is clicked', async () => {
        const logoutButton = screen.getByText('Logout')
        userEvent.click(logoutButton)
        
        await waitFor(() => {
            // Verifica que LogOut fue llamado
            expect(LogOut).toHaveBeenCalled()
            expect(message.open).toHaveBeenCalledWith(expect.objectContaining({ type: 'loading', content: 'Cerrando sesión' }))
        })
    })
})

describe('Sidebar Collapse Test', () => {
    it('should collapse sidebar when toggled', async () => {
        const sidebar = document.querySelector('.ant-layout-sider-children')
        const collapseButton = document.querySelector('.ant-layout-sider-trigger')

        userEvent.click(collapseButton!)

        await waitFor(() => {
            expect(sidebar?.parentElement).toHaveClass('ant-layout-sider-has-trigger')
        })
    })
})
