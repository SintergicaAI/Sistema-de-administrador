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
