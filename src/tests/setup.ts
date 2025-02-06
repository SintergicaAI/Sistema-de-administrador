import { afterEach, vi } from "vitest";
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

/// <reference types="vitest" />

//Mock para matchMedia, si es necesario
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), //deprecated
        removeListener: vi.fn(), //deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

//Limpieza después de cada prueba
afterEach(() => {
    cleanup();
})