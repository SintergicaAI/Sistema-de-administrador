describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it('should can to visit the login page', () => {
    cy.contains('Login')
  })

  // it('user should can to login', () => {
  //   cy.get('[placeholder="juan@gmail.com"]').type('test@gmail.com')
  //   cy.get('[placeholder="******"]').type('123456')
  //   cy.contains('Enviar').click()
  // })

  // Si el usuario no está registrado, este mismo se puede registrar
  it('should can to register', () => {
    cy.contains('Registrate').click()
    cy.url().should('include', '/register')
  })
})