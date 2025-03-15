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
            cy.get('.ant-table-tbody').should('be.visible')
            cy.get('.ant-pagination').should('be.visible')
        })

        it('if there are users, the table should show the users', () => {
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            // Muestra el head de la tabla
            cy.contains('th', 'Usuario')
            cy.contains('th', 'Rol')
            cy.contains('th', 'Correo')
            cy.contains('th', 'Grupos')
            // Muestra la data
            cy.contains('td', 'bob ford')
            cy.contains('td', 'Usuario')
            cy.contains('td', 'bob@gmail.com')
            cy.contains('td', '0 grupo')
        })

        it('user should see an error message if the invitation was not sent ', () => {
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.contains('Nuevo usuario').should('be.visible').click()
            cy.get('.ant-modal-content').should('be.visible')
            cy.get('[placeholder="ejemplo@mail.com"]').should('be.visible').type('test01@gmail.com')
            cy.get('[placeholder="Juan..."]').should('be.visible').type('userTest01')
            cy.get('.ant-select-selector').should('be.visible').click()
            cy.get('.ant-select-dropdown').should('be.visible').contains('Usuario').click()
            cy.get('[id="invitaton_TextArea"]').should('be.visible').type('Este es un texto de prueba :)')
            cy.intercept('GET', '/invitaton', { statusCode: 200 })// Se simula la respuesat de la API
            cy.contains('Enviar invitación').should('be.visible').click()
            cy.get('.ant-alert-message').should('be.visible').contains('Invitacion enviada correctamente')
        })

        it('user should can add a new admin to their team', () => {
            cy.contains('li', 'Admin').click()
            cy.url().should('include', '/administration')
            cy.contains('Nuevo usuario').should('be.visible').click()
            cy.get('.ant-modal-content').should('be.visible')
            cy.get('[placeholder="ejemplo@mail.com"]').should('be.visible').type('test02@gmail.com')
            cy.get('[placeholder="Juan..."]').should('be.visible').type('userTest02')
            cy.get('.ant-select-selector').should('be.visible').click()
            cy.get('.ant-select-dropdown').should('be.visible').contains('Administrador').click()
            cy.get('[id="invitaton_TextArea"]').should('be.visible').type('Este es un texto de prueba :)')
            cy.contains('Enviar invitación').should('be.visible').click()
            cy.get('.ant-alert-message').should('be.visible').contains('Invitacion no enviada')
        })
    })
})