import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import Login from "../Login";
import { MemoryRouter } from "react-router-dom";

beforeEach(() => {
    render(
        <MemoryRouter>
            <Login />
        </MemoryRouter>
    );
})

describe("Login Rendering Test", () => {
    it("should render the login form title", () => {
        const titleLogin = screen.getByText(/Login/i)
        expect(titleLogin).toBeInTheDocument()
    });

    it("should render email input field", () => {
        const placeholderEmail = screen.getByPlaceholderText("juan@gmail.com")
        expect(placeholderEmail).toBeInTheDocument()
    });

    it("should render password inout field", () => {
        const placeholderPassword = screen.getByPlaceholderText("******")
        expect(placeholderPassword).toBeInTheDocument()
    });

    it("should render the submit button", () => {
        const button = screen.getByRole("button", {name: /Submit/i})
        expect(button).toBeInTheDocument()
    });
});

describe("Login Validation Test", () => {
    it("should show an error message when email is empty", async () => {
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }))
        const errorMessage = await screen.findByText(/Favor de ingresar un email valido/i)
        expect(errorMessage).toBeInTheDocument()
    });

    it("should show an error message when password is empty", async () => {
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }))
        const errorMessage = await screen.findByText(/Favor de ingresar tu contraseña/i)
        expect(errorMessage).toBeInTheDocument()
    });
});

describe("Login Event Handling Test", () => {
    it("should update the email input value when typing", () => {
        const emailInput = screen.getByPlaceholderText("juan@gmail.com")
        fireEvent.change(emailInput, { target: { value: "test@gmail.com"}})
        expect(emailInput).toHaveValue("test@gmail.com")
    });

    it("should update the password input value when typing", () => {
        const passwordInput = screen.getByPlaceholderText("******")
        fireEvent.change(passwordInput, { target: { value: "test123"}})
        expect(passwordInput).toHaveValue("test123")
    });
})

describe("Email Validation Test", () => {
    it("should show an error when the email is too short", async () => {
        const emailInput = screen.getByPlaceholderText("juan@gmail.com")
        await userEvent.type(emailInput, "ab@gmail.com")
        expect(await screen.findByText(/La parte antes del @ debe tener al menos 3 caracteres/i)).toBeInTheDocument()
    });
    
    it("should show an error when the email has invalid characters", async () => {
        const emailInput = screen.getByPlaceholderText("juan@gmail.com")
        await userEvent.type(emailInput, "inval!d@gmail.com")
        expect(await screen.findByText(/La parte antes del @ contiene caracteres no válidos/i)).toBeInTheDocument()
    });
    
    it("should show an error when the email is just numbers", async () => {
        const emailInput = screen.getByPlaceholderText("juan@gmail.com")
        await userEvent.type(emailInput, "123@gmail.com")
        expect(await screen.findByText(/La parte antes del @ no puede ser solo numeros/i)).toBeInTheDocument()
    });
    
    it("should pass all validation tests", async () => {
        const emailInput = screen.getByPlaceholderText("juan@gmail.com")
        await userEvent.type(emailInput, "test@gmail.com")
        expect(screen.queryByText(/Favor de ingresar un email valido/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/La parte antes del @ debe tener al menos 3 caracteres/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/La parte antes del @ contiene caracteres no válidos/i)).not.toBeInTheDocument()
        expect(screen.queryByText(/El dominio del correo no es válido/i)).not.toBeInTheDocument()
    });
});

describe("Password Validation Test", () => {
    it("should show an error when the password is too short", async () => {
      const passwordInput = screen.getByPlaceholderText("******")
      await userEvent.type(passwordInput, "ab12")
      const errorMessage = await screen.findByText(/La contraseña debe tener al menos 6 caracteres/i)
      expect(errorMessage).toBeInTheDocument();
    });
  
    it("should show an error when the password is numbers only", async () => {
      const passwordInput = screen.getByPlaceholderText("******")
      await userEvent.type(passwordInput, "123456")
      const errorMessage = await screen.findByText(/La contraseña debe incluir letras y números/i)
      expect(errorMessage).toBeInTheDocument()
    });
  
    it("should pass all validation tests", async () => {
      const passwordInput = screen.getByPlaceholderText("******")
      await userEvent.type(passwordInput, "abc123")
      expect(screen.queryByText(/La contraseña debe incluir letras y números/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/La contraseña debe tener al menos 6 caracteres/i)).not.toBeInTheDocument()
      expect(screen.queryByText(/Favor de ingresar tu contraseña/i)).not.toBeInTheDocument()
    });
});
  