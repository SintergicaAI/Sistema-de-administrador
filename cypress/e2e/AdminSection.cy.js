describe('Admin Section Test On The Home Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
    })

    describe('When The User Login...', () => {
        beforeEach(() => {
            cy.url().should('include', '/login')
            cy.contains('Login')
            cy.intercept('GET', '/users/1', { statusCode: 200, body: { id: 1, name: 'bob' } })// Se simula la respuesat de la API
            cy.get('[placeholder="juan@gmail.com"]').type('bob@gmail.com')
            cy.get('[placeholder="******"]').type('123456')
            cy.contains('Enviar').click()
        })

        it('user should can to see the admin section', () => {
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.contains('Mi equipo').should('be.visible')
            cy.contains('Nuevo usuario').should('be.visible')
            cy.get('[placeholder="Buscar miembros"]').should('be.visible')
            cy.get('.ant-table-content').should('be.visible')
            cy.get('.ant-table-row').should('be.visible')
            cy.get('.ant-pagination').should('be.visible')
        })  
    })
})