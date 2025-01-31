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

    it('should render the "Nombre(s)" text and your placeholder', () => {
        const labelFName = screen.getByText('Nombre(s)')
        expect(labelFName).toBeInTheDocument()
        // const placeholderFName = screen.getByPlaceholderText('Nombre(s)')
        // expect(placeholderFName).toBeInTheDocument()
    })

    it('should render the "Apellidos" text and your placeholder', () => {
        const labelLName = screen.getByText('Apellidos')
        expect(labelLName).toBeInTheDocument()
        // const placeholderLName = screen.getByPlaceholderText('Apellidos')
        // expect(placeholderLName).toBeInTheDocument()
    })

    it('should render the "Correo electronico" text and your placeholder', () => {
        const labelEmail = screen.getByText('Correo electronico')
        expect(labelEmail).toBeInTheDocument()
        const placeholderEmail = screen.getByPlaceholderText('juan@gmail.com')
        expect(placeholderEmail).toBeInTheDocument()
    })

    it('should render the "Contrasena" text and your placeholder', () => {
        const password = screen.getByText('Contrasena')
        expect(password).toBeInTheDocument()
        const placeholderPassword = screen.getByTestId('password-input')
        expect(placeholderPassword).toBeInTheDocument()
    })

    it('should render the "Repetir contrasena" text and your placeholder', () => {
        const repeatPassword = screen.getByText('Repetir contrasena')
        expect(repeatPassword).toBeInTheDocument()
        const placeholderRepeatPassword = screen.getByTestId('repeat-password-input')
        expect(placeholderRepeatPassword).toBeInTheDocument()
    })
    
    it('should render the "Enviar" button', () => {
        const button = screen.getByRole('button', {name: /Enviar/i})
        expect(button).toBeInTheDocument()
    })

    it('should render the "Ya tienes una cuenta?" and "Inicia sesion" text', () => {
        const text = screen.getByText('Ya tienes una cuenta?')
        expect(text).toBeInTheDocument()
        const link = screen.getByText('Inicia sesion')
        expect(link).toBeInTheDocument()
    })
})
