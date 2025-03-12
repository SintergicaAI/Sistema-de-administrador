import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { SiderContent } from '../presentation/components/Administration/SiderContent.tsx'
import { AdministrationContext } from '../presentation/context/Administration/AdministrationContext.tsx'
import { MemoryRouter } from 'react-router-dom'

// Mock de GetCompanyGroups
vi.mock('../application/use-cases/GetCompanyGroups.ts', () => ({
    GetCompanyGroups: vi.fn().mockImplementation(() => ({
        execute: vi.fn().mockResolvedValue(["Grupo 1", "Grupo 2"])
    }))
}))

// Mock del contexto con todas las propiedades necesarias
const mockAdminstrationContext = {
    selectedRow: {
        groups: [{ id: "1", name: "Grupo 1" }],
        role: "Usuario"
    },
    hasSelected: true,
    dataTable: [],
    totalItemsTable: 0,
    searchText: "",
    changeSelectedRow: vi.fn(),
    changeHasSelected: vi.fn(),
    setDataTabla: vi.fn(),
    setTotalItemsTable: vi.fn(),
    changeSearchText: vi.fn()
}

beforeEach(() =>{ 
    render(
        <MemoryRouter>
            <AdministrationContext.Provider value = { mockAdminstrationContext }>
                <SiderContent />
            </AdministrationContext.Provider>
        </MemoryRouter>
    )
})

describe('SiderContent Test', () => {
    it('should render labels correctly', () => {
        const roleLabel = screen.getByText('Rol')
        expect(roleLabel).toBeInTheDocument()
        const groupLabel = screen.getByText('Grupos al que pertenece')
        expect(groupLabel).toBeInTheDocument()
    })

    it('should render role options', () => {
        expect(screen.getByLabelText('Administrador')).toBeInTheDocument()
        expect(screen.getByLabelText('Usuario')).toBeInTheDocument()
        expect(screen.getByLabelText('Dueño')).toBeInTheDocument()
    })

    it('should render the search input', () => {
        const searchInput = screen.getByPlaceholderText('Buscar')
        expect(searchInput).toBeInTheDocument()
    });

    it('should render company groups after loading', async () => {
        await waitFor(() => {
            expect(screen.getByText('Grupo 1')).toBeInTheDocument()
            expect(screen.getByText('Grupo 2')).toBeInTheDocument()
        })
    })
})
