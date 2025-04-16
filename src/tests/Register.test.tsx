import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { Register } from '../presentation/pages/auth/Register.tsx'
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
        const placeholderFName = screen.getByPlaceholderText('Nombre(s)')
        expect(placeholderFName).toBeInTheDocument()
    })

    it('should render the "Apellidos" text and your placeholder', () => {
        const labelLName = screen.getByText('Apellidos')
        expect(labelLName).toBeInTheDocument()
        const placeholderLName = screen.getByPlaceholderText('Apellidos')
        expect(placeholderLName).toBeInTheDocument()
    })

    it('should render the "Correo electronico" text and your placeholder', () => {
        const labelEmail = screen.getByText('Correo electronico')
        expect(labelEmail).toBeInTheDocument()
        const placeholderEmail = screen.getByPlaceholderText('juan@gmail.com')
        expect(placeholderEmail).toBeInTheDocument()
    })

    it('should render the "Contrasena" text and your placeholder', () => {
        const password = screen.getByText('Contraseña')
        expect(password).toBeInTheDocument()
        const placeholderPassword = screen.getByTestId('password-input')
        expect(placeholderPassword).toBeInTheDocument()
    })

    it('should render the "Repetir contrasena" text and your placeholder', () => {
        const repeatPassword = screen.getByText('Repetir contraseña')
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
        const link = screen.getByText('Inicia sesión')
        expect(link).toBeInTheDocument()
    })
})


describe('Resgiter Validation Test', () => {
    it('should show an error for invalid first name', async () => {
        const firstNameInput = screen.getByPlaceholderText('Nombre(s)')
        await userEvent.type(firstNameInput, '123')
        const errorMessage = await screen.findByText('No se permiten caracteres especiales y numeros')
        expect(errorMessage).toBeInTheDocument()
    })

    it('should show an error for invalid last name', async () => {
        const lastNameInput = screen.getByPlaceholderText('Apellidos')
        await userEvent.type(lastNameInput, '123')
        const errorMessage = await screen.findByText('No se permiten caracteres especiales y numeros')
        expect(errorMessage).toBeInTheDocument()
    })

    it('should show an error for invalid email', async () => {
        const emailInput = screen.getByPlaceholderText('juan@gmail.com')
        await userEvent.type(emailInput, 'testInvalid.com')
        const errorMessage = await screen.findByText('Favor de ingresar un email valido')
        expect(errorMessage).toBeInTheDocument()
    })

    it('should show an error when the password is too short', async () => {
        const passwordInput = screen.getByTestId('password-input')
        await userEvent.type(passwordInput, '123')
        const errorMessage = await screen.findByText('Contrasena menor a 6 caracteres')
        expect(errorMessage).toBeInTheDocument()
    })

    it('should show an error when the password and repeat password do not match', async () => {
        const passwordInput = screen.getByTestId('password-input')
        await userEvent.type(passwordInput, '123456')
        const repeatPasswordInput = screen.getByTestId('repeat-password-input')
        await userEvent.type(repeatPasswordInput, '12345')
        const errorMessage = await screen.findByText('La contrasena no coincide')
        expect(errorMessage).toBeInTheDocument()
    })
})
