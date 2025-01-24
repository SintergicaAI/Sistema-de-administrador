import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Login from "../Login";

describe("Login Rendering Test", () => {
    it("should render the login form title", () => {
        render(<Login />)
        const titleLogin = screen.getByText(/Login/i)
        expect(titleLogin).toBeInTheDocument()
    });

    it("should render email input field", () => {
        render(<Login />)
        const placeholderEmail = screen.getByPlaceholderText("juan@gmail.com")
        expect(placeholderEmail).toBeInTheDocument()
    });

    it("should render password inout field", () => {
        render(<Login />)
        const placeholderPassword = screen.getByPlaceholderText("******")
        expect(placeholderPassword).toBeInTheDocument()
    });

    it("should render the submit button", () => {
        render(<Login />)
        const button = screen.getByRole("button", {name: /Submit/i})
        expect(button).toBeInTheDocument()
    });
});

describe("Login Validation Test", () => {
    it("should show an error message when email is empty", async () => {
        render(<Login />)
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }))
        const errorMessage = await screen.findByText(/Favor de ingresar un email valido/i)
        expect(errorMessage).toBeInTheDocument()
    });

    it("should show an error message when password is empty", async () => {
        render(<Login />)
        fireEvent.click(screen.getByRole("button", { name: /Submit/i }))
        const errorMessage = await screen.findByText(/Favor de ingresar tu contraseña/i)
        expect(errorMessage).toBeInTheDocument()
    });
});

describe("Login Event Handling Test", () => {
    it("should update the email input value when typing", () => {
        render(<Login />)
        const emailInput =  screen.getByPlaceholderText("juan@gmail.com")
        fireEvent.change(emailInput, { target: { value: "test@example.com"}})
        expect(emailInput).toHaveValue("test@example.com")
    });

    it("should update the password input value when typing", () => {
        render(<Login />)
        const passwordInput =  screen.getByPlaceholderText("******")
        fireEvent.change(passwordInput, { target: { value: "test123"}})
        expect(passwordInput).toHaveValue("test123")
    });
})