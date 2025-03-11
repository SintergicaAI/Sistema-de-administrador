describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
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
