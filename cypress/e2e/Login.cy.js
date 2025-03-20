describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')

        // Se intercepta el refreshToken ya que Cypress limpia el estado de la aplicación entre pruebas, lo que puede
        // causar que no guarde el rT en las cookies o localStorage
        cy.intercept('POST', '/users/refreshToken', {
            statusCode: 200,
            body: { accessToken: 'test-refreshToken' }
        }).as('refreshToken')
    })
  
    it('should can to visit the login page', () => {
        cy.url().should('include', '/login')
        cy.contains('Login')
    })
  
    it('user should can to login', () => {
        cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
        cy.get('[placeholder="******"]').type('123456')
        cy.contains('Enviar').click()
        cy.contains('Iniciando sesion...')
    })
})
