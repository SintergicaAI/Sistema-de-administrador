describe('Register Test', () => {
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
        cy.contains('¡Bienvenido de nuevo!')
    })
  
    // Si el usuario no está registrado, este mismo se puede registrar
    it('should can to visit the register page', () => {
        cy.contains('Registrate').click()
        cy.url().should('include', 'auth/register')
        cy.contains('Registra tu cuenta')
    })

    it('user should can to register', () => {
        cy.contains('Registrate').click()
        cy.url().should('include', '/register')
        cy.get('[placeholder="Nombre(s)"]').type('Emma')
        cy.get('[placeholder="Apellidos"]').type('San')
        cy.get('[placeholder="juan@gmail.com"]').type('test02@gmail.com')
        cy.get('#basic_password').type('123456')
        cy.get('#basic_repeatPassword').type('123456')
        cy.contains('Enviar').click()
        cy.contains('Registrando datos...')
    })
})
