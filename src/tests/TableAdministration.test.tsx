import { render, screen } from '@testing-library/react'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { TableAdministration } from '../presentation/components/Administration/TableAdministration.tsx'
import { AdministrationContext } from '../presentation/context/Administration/AdministrationContext.tsx'

// Mock de getComputedStyle para evitar el error en JSDOM
beforeAll(() => {
    vi.stubGlobal('getComputedStyle', () => ({
        getPropertyValue: () => "",
    }))
})

// Mock de la clase AuthApi
vi.mock("../infrastructure/api/AuthApi.ts", () => ({
    AuthApi: vi.fn().mockImplementation(() => ({
        getToken: vi.fn().mockReturnValue('mocked-token'),
    }))
}))

// Mock de la clase CompanyApi
vi.mock("../infrastructure/api/CompanyApi.ts", () => ({
    CompanyApi: vi.fn().mockImplementation(() => ({
        findUsersInCompany: vi.fn().mockResolvedValue({
            ok: true,  // Simulando que la respuesta es exitosa
            json: () => Promise.resolve([
                {
                    id: "1",
                    fullName: "Juan Pérez",
                    role: "Admin",
                    email: "juan@example.com",
                    groups: ["General"]
                }
            ])
        })
    }))
}))

// Mock del contexto
const mockContextValue = {
    changeSelectedRow: vi.fn(),
    changeHasSelected: vi.fn(),
    selectedRow: {},
    hasSelected: false,
    setDataTabla: vi.fn(),
    changeDataTabla: vi.fn(),
    totalItemsTable: 10,
    setTotalItemsTable: vi.fn(),
    setLoadingTable: vi.fn(),
    searchText: "",
    changeSearchText: vi.fn(),
    dataTable: [
        {
            id: "1",
            key: "1",
            fullName: "Juan Pérez",
            role: "Admin",
            email: "juan@example.com",
            groups: ["General"],
        }
    ]
}

beforeEach(() => {
    render(
        <MemoryRouter>
            <AdministrationContext.Provider value={mockContextValue}>
                <TableAdministration />
            </AdministrationContext.Provider>
        </MemoryRouter>
    )
})

describe('TableAdministration Component Test', () => {
    it('should render correctly', () => {
        expect(screen.getByText('Usuario')).toBeInTheDocument()
        expect(screen.getByText('Rol')).toBeInTheDocument()
        expect(screen.getByText('Correo')).toBeInTheDocument()
        expect(screen.getByText('Grupos')).toBeInTheDocument()
    })
})
