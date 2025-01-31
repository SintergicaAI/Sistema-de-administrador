import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Register } from '../Register.tsx'
import { MemoryRouter } from 'react-router-dom'

beforeEach(() => {
    render(
        <MemoryRouter>
            <Register />
        </MemoryRouter>
    )
})

describe('Register Rendering Test', () => {
    it('should render the register form title', () => {
        const titleRegister = screen.getByText('Registro')
        expect(titleRegister).toBeInTheDocument()
    })

    it('should render the "First Name" text', () => {
        const labelFName = screen.getByText("First Name")
        expect(labelFName).toBeInTheDocument()
    })

    it('should render the "Last Name" text', () => {
        const labelLName = screen.getByText("Last Name")
        expect(labelLName).toBeInTheDocument()
    })

    it('should render the "contrasena" text', () => {
        const password = screen.getByText("contrasena")
        expect(password).toBeInTheDocument()
    })

    it('should render the "repetir contrasena" text', () => {
        const repeatPassword = screen.getByText('repetir contrasena')
        expect(repeatPassword).toBeInTheDocument()
    })
    
    it('should render the "Enviar" button', () => {
        const button = screen.getByRole('button', {name: /Enviar/i})
        expect(button).toBeInTheDocument()
    })

})
