import { render, screen } from '@testing-library/react'
import { beforeEach, describe, it, expect, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import { ModelDetail } from '../presentation/pages/ModelDetail.tsx'
// import { GetModelDetails } from '../application/use-cases/GetModelDetails.ts'

// Se hace un Mock de userParams para simular la URL
vi.mock('react-router', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router')>()
    return {
        ...actual,
        useParams: vi.fn().mockReturnValue({ id: "123" })
    }
})

// Se hace un mock de GetModelDetails para simular la respuesta del API
vi.mock('../application/use-cases/GetModelDetails', () => ({
    GetModelDetails: vi.fn().mockImplementation(() => ({
        execute: vi.fn().mockResolvedValue({
            description: 'Esto es una descripcion de prueba',
            author: { fullName: 'Model Test' },
            isActive: true,
        })
    }))
}))

beforeEach(() => {
    render(
        <MemoryRouter>
            <ModelDetail />
        </MemoryRouter>
    )
})

it('should fetch and display model details', async () => {
    expect(screen.getByText('Model Details')).toBeInTheDocument()
    expect(screen.getByText('Details for Model 123')).toBeInTheDocument()
    expect(screen.getByText('123')).toBeInTheDocument()
    expect(await screen.findByText('Esto es una descripcion de prueba')).toBeInTheDocument()
    expect(await screen.findByText('Model Test')).toBeInTheDocument()
    //Se verifica si el modelo efectivamente esta activado
    expect(screen.getByRole('switch')).toBeChecked()
})

describe('Test to Verify The Case When "id" Is "null"', () => {
    beforeEach(() => {
        // Simulamos que el id es null
        vi.doMock('react-router', async (importOriginal) => {
            const actual = await importOriginal<typeof import('react-router')>()
            return {
                ...actual,
                useParams: vi.fn().mockReturnValue({ id: null })
            }
        })
    })

    it('should not display model details when ID is null', ()=> {
        expect(screen.queryByText('Details for Model')).not.toBeInTheDocument()
    })
})
