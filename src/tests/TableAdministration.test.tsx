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

// Mock del contexto
const mockContextValue = {
    changeSelectedRow: vi.fn(),
    changeHasSelected: vi.fn(),
    selectedRow: {},
    hasSelected: false,
    setDataTabla: vi.fn(),
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
