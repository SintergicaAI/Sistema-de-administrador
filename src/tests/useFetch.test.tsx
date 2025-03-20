import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from "vitest"
import useFetch from '../hooks/useFetch.tsx'

global.fetch = vi.fn() // Se crea un Mock de fetch para evitar llamadas la API real

describe('useFecth Hook Test', ()=> {
    const API_URL = 'https://api.test.com' // Se simula la API
    const mockResponse = { message: "Success" } // Respuesta exitosa simulada de la API

    beforeEach(() => {
        vi.resetAllMocks() // Se restablecen los Mocks entre pruebas para evitar interferencias entre las mismas
        import.meta.env.VITE_API_URL = API_URL // Simula el valor de la variable de entorno VITE_API_URL
    })

    it('should start with the correct values', () => {
        const { result } = renderHook(() => useFetch('/test'))

        expect(result.current.isLoading).toBe(true) // Esta cargando
        expect(result.current.data).toBe(null) // Sin datos aun
        expect(result.current.hasError).toBe(false) // Sin errores
    })

    it('should make a successful request and update the status', async () => {
        // Se devuleve un response con StatusCode 200 y un mockResponse en formato JSON
        vi.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(JSON.stringify(mockResponse), {
                status: 200,
                headers: { 'content-type': 'application/json' },
            })
        )

        // Se utiliza el hook useFetch para hacer una solicitud a la API
        const { result } = renderHook(() => useFetch('/test'))

        // Esperamos a que despues de ejecutar geData(), el estado del hook cambie
        await act(async () => {
            await result.current.getData()
        })

        expect(result.current.isLoading).toBe(false)
        expect(result.current.data).toEqual(mockResponse)
        expect(result.current.hasError).toBe(false)
    })

    it('should handle errors in the request', async () => {
        vi.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(null, {
                status: 500,
                statusText: 'Internal Server Error'
            })
        )

        const { result } = renderHook(() => useFetch('/test'))

        await act(async () => {
            await result.current.getData()
        })

        expect(result.current.isLoading).toBe(false)
        expect(result.current.hasError).toBe(true)
        expect(result.current.data).toBe(null)
        /* expect(result.current.error).toEqual({
            code: 500,
            message: "Internal Server Error"
        }) */
    })

    it('should send the token correctly in the headers', async () => {
        const mockToken = 'test_token' // Simula un token valido

        const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValueOnce(
            new Response(JSON.stringify(mockResponse), {
                status: 200,
                statusText: 'OK',
                headers: { 'content-type': 'application/json' }
            })
        )

        const { result } = renderHook(() =>
            useFetch('/test', 'GET', {}, mockToken)
        )

        await act(async () => {
            await result.current.getData()
        })

        expect(mockFetch).toHaveBeenCalledWith(`${API_URL}/test`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${mockToken}`
            }
        })
    })
})
