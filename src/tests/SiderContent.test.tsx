import { render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { SiderContent } from '../presentation/components/Administration/SiderContent.tsx'
import { AdministrationContext } from '../presentation/context/Administration/AdministrationContext.tsx'
import { MemoryRouter } from 'react-router-dom'
import { Roles } from '../domain/enums/UserRole.ts'
import { Groups } from '../domain/enums/UserGroups.ts'
import { DataType } from '../presentation/components/Administration/types/TableAdministrationTypes.ts'

// Mock del contexto con todas las propiedades necesarias
const mockAdminstrationContext = { 
    
    selectedRow: { groups: [Groups[0]], role: Roles[1] }, // Valores iniciales (General y Usuario)
    hasSelected: true,
    dataTable: [] as DataType[],
    totalItemsTable: 0,
    searchText: '',
        
    // Funciones Mock que no hacen nada en la prueba pero
    changeSelectedRow: () => {},
    changeHasSelected: () => {},
    setDataTabla: () => {},
    setTotalItemsTable: () => {},
    changeSearchText: () => {},
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
    it('should render the role selection label', () => {
        const roleLabel = screen.getByText('Rol')
        expect(roleLabel).toBeInTheDocument()
    })

    it('should render the groups selection label', () => {
        const groupLabel = screen.getByText('Grupos al que pertenece')
        expect(groupLabel).toBeInTheDocument()
    })

    it('should render the search input', () => {
        const searchInput = screen.getByPlaceholderText('Buscar');
        expect(searchInput).toBeInTheDocument();
    });

    it('should render all role options', () => {
        Roles.forEach(role => {
            const roleOption = screen.getByText(role)
            expect(roleOption).toBeInTheDocument()
        })
    })

    it('should render all groups as checkboxes', () => {
        Groups.forEach(group => {
            const groupOption = screen.getByText(group) // Encontramos el texto visible
            const checkbox = groupOption.closest('div').querySelector('input[type="checkbox"]') // Buscamos el checkbox asociado
            expect(checkbox).toBeInTheDocument() // Verificamos que el checkbox esté presente en el DOM
        })
    })

    it('should have the default role selected', () => {
        const radioButton = screen.getByLabelText('Usuario');
        expect(radioButton).toBeChecked();
    })

    it('should allow typing in the search input', async () => {
        const searchInput = screen.getByPlaceholderText('Buscar')
        await userEvent.type(searchInput, 'Finanzas')
        expect(searchInput).toHaveValue('Finanzas')
    })
})
