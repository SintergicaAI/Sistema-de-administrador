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
});

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
    describe("Email Validation Test", () => {
        it("should show an error message when email is empty", async () => {
            fireEvent.click(screen.getByRole("button", { name: /Submit/i }))
            const errorMessage = await screen.findByText(/Favor de ingresar un email valido/i)
            expect(errorMessage).toBeInTheDocument()
        });
    
        it("should show an error for invalid email format", async () => {
            const emailInput = screen.getByPlaceholderText("juan@gmail.com")
            await userEvent.type(emailInput, "testInvalid.com")
            expect(await screen.findByText(/Favor de ingresar un email valido/i)).toBeInTheDocument()
        });
    });

    describe("Password Validation Test", () => {
        it("should show an error message when password is empty", async () => {
            fireEvent.click(screen.getByRole("button", { name: /Submit/i }))
            const errorMessage = await screen.findByText(/Favor de ingresar una contraseña valida/i)
            expect(errorMessage).toBeInTheDocument()
        });
    
        it("should show an error when the password is too short", async () => {
            const passwordInput = screen.getByPlaceholderText("******")
            await userEvent.type(passwordInput, "123")
            const errorMessage = await screen.findByText(/Favor de ingresar una contraseña valida/i)
            expect(errorMessage).toBeInTheDocument()
        });
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
        fireEvent.change(passwordInput, { target: { value: "123456"}})
        expect(passwordInput).toHaveValue("123456")
    });
});
  