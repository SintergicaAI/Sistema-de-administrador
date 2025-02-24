describe('Register Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })
  
    it('should can to visit the login page', () => {
        cy.contains('Login')
    })
  
    // Si el usuario no está registrado, este mismo se puede registrar
    it('should can to visit the register page', () => {
        cy.contains('Registrate').click()
        cy.url().should('include', '/register')
        cy.contains('Registro')
    })

    it('user should can to register', () => {
        cy.contains('Registrate').click()
        cy.url().should('include', '/register')
        cy.get('[placeholder="Nombre(s)"]').type('Jesus')
        cy.get('[placeholder="Apellidos"]').type('San')
        cy.get('[placeholder="juan@gmail.com"]').type('test01@gmail.com')
        cy.get('#basic_password').type('123456')
        cy.get('#basic_repeatPassword').type('123456')
        // cy.contains('Enviar').click()
    })
})
